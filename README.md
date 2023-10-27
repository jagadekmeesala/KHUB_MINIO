# KHUB_MINIO

# 1 What is an object storage system?

An object storage system is a distributed storage architecture that stores data as objects. Objects are self-described units of data that can contain any type of data, such as text, images, videos, and audio files. Object storage systems are designed to be scalable, durable, and cost-effective.

**Common uses of object storage systems**

- **Web and mobile applications:** Object storage systems are often used to store and deliver content for web and mobile applications. For example, object storage systems can be used to store images, videos, and music for a website or mobile app.
- **Data backups and archiving:** Object storage systems are also a good choice for data backups and archiving. Object storage systems are durable and scalable, which makes them ideal for storing large amounts of data for long periods of time.
- **Big data analytics:** Object storage systems can also be used for big data analytics. Object storage systems can store and manage large amounts of data that can be processed by big data analytics applications.

# 2 Three possible alternatives for Minio

- **Amazon S3:** Amazon S3 is the most popular object storage service. It is a highly scalable and reliable service that can be used to store any type of data.
- **Microsoft Azure Blob Storage:** Microsoft Azure Blob Storage is another popular object storage service. It is a scalable and durable service that can be used to store any type of data.
- **Google Cloud Storage:** Google Cloud Storage is a third popular object storage service. It is a scalable and reliable service that can be used to store any type of data.

# 3 Setting up Minio locally on your system

To set up Minio locally on your system, you can follow these steps:

1. Download and install Minio from the official website.
2. Create a directory where you want to store your Minio data.
3. Start Minio using the following command:
   
   minio server --address <ip-address>:<port> --data-dir <data-directory>
   

4. Open a web browser and navigate to the following URL:

   
   http://<ip-address>:<port>
   

5. You should see the Minio web console.



# 4 Obtaining Files from and Storing Files to Minio Storage

This guide will walk you through obtaining files from and storing files to your Minio storage setup from an application frontend (React.js) and backend (Node.js and Python).

## Step 1: Choose Your Approach

There are two primary ways to interact with Minio from your application: using the Minio SDK or the Minio REST API.

### Using the Minio SDK

## Step 2: Create a Bucket

To organize your data, create a bucket within your Minio storage setup.

from minio import Minio

client = Minio('localhost:9000', access_key='minioadmin', secret_key='minioadmin')

### Specify the name of the bucket you want to create
bucket = 'my-bucket'

### Create the bucket
client.make_bucket(bucket)

## Step 3: Upload a File to the Bucket

Now, you can upload a file to the created bucket. For example, we'll upload a file named `my-file.txt`.


### Upload a file to the bucket
client.put_object(bucket, 'my-file.txt', open('my-file.txt', 'rb'))

## Step 4: Download a File from the Bucket

To retrieve a file from the bucket, you can download it. This example downloads `my-file.txt` from the bucket.

### Download a file from the bucket
client.fget_object(bucket, 'my-file.txt', 'my-file.txt')

## Step 5: Delete a File from the Bucket

If you want to remove a file from the bucket, you can use the following code. This deletes `my-file.txt` from the bucket.


### Delete a file from the bucket
client.remove_object(bucket, 'my-file.txt')

### File structure

![image](https://github.com/jagadekmeesala/KHUB_MINIO/assets/96018533/ebb9e8f2-8d93-450a-9a66-042639ca4f2b)

### Frontend


### Backend


### Login to the Minio Server

![WhatsApp Image 2023-10-26 at 3 02 08 PM](https://github.com/jagadekmeesala/KHUB_MINIO/assets/96018533/d669e074-8303-4c56-b35e-c3d164c1442f)
### Running the Project 

![WhatsApp Image 2023-10-26 at 3 12 01 PM](https://github.com/jagadekmeesala/KHUB_MINIO/assets/96018533/f2d32d96-9b47-4346-9546-ce88d1aa259a)

### Output of the Project



### After Uploading Image 


### Image Uploading in Minio 
