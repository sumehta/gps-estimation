# -*- coding: utf-8 -*-
from django.db import models

class Document(models.Model):
    docfile = models.FileField(upload_to='documents')
    id = models.CharField(primary_key=True, max_length=500)

class Image(models.Model):
    imagefile = models.ImageField(upload_to='database_images')
    id = models.CharField(max_length=200, primary_key=True)
    lat = models.FloatField(help_text='Latitude', default=0)
    long = models.FloatField(help_text='Longitude', default=0)
    timestamp = models.FloatField(help_text='time since something', default='-1')
    country = models.CharField(max_length=500, default='Unavailable')

class Clue(models.Model):
    clueTitle = models.CharField(max_length=50)
    clueContent = models.CharField(max_length=1000)
    markerListData = models.CharField(max_length=2000)
    imageId = models.CharField(max_length=20)
    workerId = models.CharField(max_length=20)
