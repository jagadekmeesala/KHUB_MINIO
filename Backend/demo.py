from flask import Flask, request, jsonify, send_file
from minio import Minio
from minio.error import S3Error
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
minio_endpoint = "127.0.0.1:9000"
access_key = "admin"  
secret_key = "password"  
secure = False

minio_client = Minio(minio_endpoint, access_key=access_key, secret_key=secret_key, secure=secure)

bucket_name = "pictures"
if not minio_client.bucket_exists(bucket_name):
    minio_client.make_bucket(bucket_name)
    print(f"Bucket '{bucket_name}' has been created")

@app.route('/upload', methods=['POST'])
def upload_photo():
    try:
        uploaded_file = request.files['photo']
        if uploaded_file:
            object_name = uploaded_file.filename
            minio_client.put_object(bucket_name, object_name, uploaded_file, length=uploaded_file.content_length, content_type=uploaded_file.content_type)
            objects = minio_client.list_objects(bucket_name)
            total_size = sum(obj.size for obj in objects)

            return jsonify({"message": f"Uploaded '{object_name}' to bucket '{bucket_name}'", "bucket_size": total_size})

        return jsonify({"error": "No file uploaded."})

    except S3Error as e:
        print(f"An error occurred while uploading: {e}")
        return jsonify({"error": f"An error occurred while uploading: {e}"})
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred."})

@app.route('/delete/<image_name>', methods=['DELETE'])
def delete_image(image_name):
    try:
        minio_client.remove_object(bucket_name, image_name)
        objects = minio_client.list_objects(bucket_name)
        total_size = sum(obj.size for obj in objects)

        return jsonify({"message": f"Deleted '{image_name}' from bucket '{bucket_name}'", "bucket_size": total_size})

    except S3Error as e:
        print(f"An error occurred while deleting: {e}")
        return jsonify({"error": f"An error occurred while deleting: {e}"})
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred."})

@app.route('/images', methods=['GET'])
def list_images():
    try:
        objects = minio_client.list_objects(bucket_name)
        image_names = [obj.object_name for obj in objects]
        return jsonify(image_names)
    except S3Error as e:
        print(f"An error occurred while listing images: {e}")
        return jsonify([])  # Return an empty list on error

@app.route('/images/<image_name>', methods=['GET'])
def get_image(image_name):
    try:
        data = minio_client.get_object(bucket_name, image_name)
        return send_file(data, as_attachment=True, download_name=image_name)  # Serve the image file
    except S3Error as e:
        print(f"An error occurred while fetching the image: {e}")
        return jsonify({"error": f"An error occurred while fetching the image: {e}"})
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An unexpected error occurred."})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
