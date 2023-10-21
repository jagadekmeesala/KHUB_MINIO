from flask import Flask, request, jsonify, send_from_directory
from minio import Minio
from minio.error import S3Error
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Minio server connection details
minio_endpoint = "127.0.0.1:9000"
access_key = "admin"  # Replace with your Minio access key
secret_key = "password"  # Replace with your Minio secret key
secure = False

# Create a Minio client
minio_client = Minio(minio_endpoint, access_key=access_key, secret_key=secret_key, secure=secure)

# Specify the bucket name
bucket_name = "pictures"  # Replace with your Minio bucket name

# Ensure the bucket exists, create it if it doesn't
if not minio_client.bucket_exists(bucket_name):
    minio_client.make_bucket(bucket_name)
    print(f"Bucket '{bucket_name}' has been created")

@app.route('/upload', methods=['POST'])
def upload_photo():
    try:
        uploaded_file = request.files['photo']
        if uploaded_file:
            # Specify the object name (key) under which the photo will be stored in the bucket
            object_name = uploaded_file.filename

            # Upload the photo to the bucket
            minio_client.put_object(bucket_name, object_name, uploaded_file, length=uploaded_file.content_length, content_type=uploaded_file.content_type)

            # Calculate the total size of the bucket
            objects = minio_client.list_objects(bucket_name)
            total_size = sum(obj.size for obj in objects)

            return jsonify({"message": f"Uploaded '{object_name}' to bucket '{bucket_name}'", "bucket_size": total_size})

        return jsonify({"error": "No file uploaded."})

    except S3Error as e:
        # Print the detailed error message for debugging purposes
        print(f"An error occurred while uploading: {e}")
        return jsonify({"error": f"An error occurred while uploading: {e}"})
    except Exception as e:
        # Handle other exceptions
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred."})

@app.route('/delete/<image_name>', methods=['DELETE'])
def delete_image(image_name):
    try:
        # Remove the specified image from the bucket
        minio_client.remove_object(bucket_name, image_name)
        
        # Calculate the total size of the bucket after deletion
        objects = minio_client.list_objects(bucket_name)
        total_size = sum(obj.size for obj in objects)

        return jsonify({"message": f"Deleted '{image_name}' from bucket '{bucket_name}'", "bucket_size": total_size})

    except S3Error as e:
        # Print the detailed error message for debugging purposes
        print(f"An error occurred while deleting: {e}")
        return jsonify({"error": f"An error occurred while deleting: {e}"})
    except Exception as e:
        # Handle other exceptions
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred."})

@app.route('/images/<image_name>', methods=['GET'])
def get_image(image_name):
    # Serve uploaded images from a directory
    return send_from_directory(bucket_name, image_name)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
