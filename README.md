# KHUB_MINIO

# 1 What is an object storage system?

An object storage system is a distributed storage architecture that stores data as objects. Objects are self-described units of data that can contain any type of data, such as text, images, videos, and audio files. Object storage systems are designed to be scalable, durable, and cost-effective.

**Common uses of object storage systems**

- **Web and mobile applications:** Object storage systems are often used to store and deliver content for web and mobile applications. For example, object storage systems can be used to store images, videos, and music for a website or mobile app.
- **Data backups and archiving:** Object storage systems are also a good choice for data backups and archiving. Object storage systems are durable and scalable, which makes them ideal for storing large amounts of data for long periods of time.
- **Big data analytics:** Object storage systems can also be used for big data analytics. Object storage systems can store and manage large amounts of data that can be processed by big data analytics applications.
\```

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


# 4 Obtaining files from and storing files to your Minio storage setup from an application frontend (React.js) and backend (Node.js and Python)

There are a few different ways to obtain files from and store files to your Minio storage setup from an application frontend and backend.

One way is to use the Minio SDK. The Minio SDK provides a set of APIs that you can use to interact with Minio from your application. The Minio SDK is available for a variety of programming languages, including JavaScript, Node.js, and Python.

Another way to obtain files from and store files to your Minio storage setup is to use the Minio REST API. The Minio REST API provides a set of HTTP APIs that you can use to interact with Minio from your application. The Minio REST API is accessible from any programming language.

**Using Minio along with the tech stack you have been learning, that is perform the following operations:**

- **Create a bucket:**


from minio import Minio

client = Minio('localhost:9000', access_key='minioadmin', secret_key='minioadmin')

# Create a bucket
bucket = 'my-bucket'
client.make_bucket(bucket)

- **Upload a file to a bucket:

# Upload a file to the bucket
client.put_object(bucket, 'my-file.txt', open('my-file.txt', 'rb'))


- **Download a file from a bucket:**


# Download a file from the bucket
client.fget_object(bucket, 'my-file.txt', 'my-file.txt')

- **Delete a file from a bucket:**


# Delete a file from the bucket
client.remove_object(bucket, 'my-file.txt')
