FROM ubuntu:latest

RUN apt-get update && apt-get install -y python3 python3-pip

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

ENV FLASK_APP=server
EXPOSE 8000

CMD python3 server.py
