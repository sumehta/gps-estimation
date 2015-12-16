# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect, HttpResponse, HttpResponseServerError
from django.core.urlresolvers import reverse
from bag_of_words import bag_of_words
from models import Document, Image
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "contextslices.settings")
from .models import Clue

def get_matches(image_name, feature_type='SIFT'):
    bow = bag_of_words.BagOfWords()
    if feature_type == 'color':
        query_hist = bow.compute_image_histogram(image_name=image_name, feature_type='color')
        return bow.get_similar_images(query_hist, feature_type='color')

    elif feature_type == 'GIST':
        query_hist = bow.compute_image_histogram(image_name=image_name, feature_type='GIST')
        return bow.get_similar_images(query_hist, feature_type='GIST')

    else:
        query_hist = bow.compute_image_histogram(image_name=image_name)
        return bow.get_similar_images(query_hist)


def store_location_information(request, matched_image_names):
        request.session['lat1'] = 0.0
        request.session['long1'] = 0.0
        request.session['lat2'] = 0.0
        request.session['long2'] = 0.0
        request.session['lat3'] = 0.0
        request.session['long3'] = 0.0
        request.session['lat4'] = 0.0
        request.session['long4'] = 0.0
        j = 0
        for i in range(len(matched_image_names)):
            try:
                image = Image.objects.get(pk=matched_image_names[i])
                if j == 0:
                    request.session['lat1'] = float(image.lat)
                    request.session['long1'] = float(image.long)
                if j == 1:
                    request.session['lat2'] = float(image.lat)
                    request.session['long2'] = float(image.long)
                if j == 2:
                    request.session['lat3'] = float(image.lat)
                    request.session['long3'] = float(image.long)
                if j == 3:
                    request.session['lat4'] = float(image.lat)
                    request.session['long4'] = float(image.long)
                j += 1
            except:
                pass


def start(request):
    return render_to_response(
            'upload.html', context_instance=RequestContext(request)
                   )

def list(request):
    # Handle file upload
    # del request.session['file']
    # Document.objects.all().delete()
    if request.method == 'POST':
        # request.session['file'] = request.FILES.get('file', False)
        newdoc = Document(docfile=request.FILES.get('file', False))
        if newdoc.docfile:
            newdoc.id = str(request.FILES.get('file').name)
            newdoc.save()
            request.session['file'] = newdoc

        # # Redirect to the document list after POST
        matches = get_matches(str(request.FILES.get('file').name))
        if len(matches)>20:
            matches = matches[:20]
        matched_images = []
        matched_image_names = []
        for im_name in matches:
            matched_images.append(Image.objects.get(pk=im_name))
            matched_image_names.append(im_name)

        request.session['matches'] = matched_images
        store_location_information(request, matched_image_names)
        return HttpResponseRedirect(reverse('contextslices.photo.views.search'))


    if request.method == 'GET':
        matches = get_matches(request.session.get('file').id)

        if len(matches) > 20:
            matches = matches[:20]
            matched_images = []
            matched_image_names = []
            for im_name in matches:
                matched_images.append(Image.objects.get(pk=im_name))
                matched_image_names.append(im_name)
            request.session['matches'] = matched_images
            store_location_information(request, matched_image_names)

        return render_to_response(
            'results.html',
            {'file': request.session.get('file'), 'matches': matched_images, 'num_results': len(matched_images)},
            context_instance=RequestContext(request)
        )


def gist(request):
    if request.method == 'GET':
        matches = get_matches(request.session.get('file').id, feature_type='GIST')
        if len(matches) > 20:
            matches = matches[:20]
        matched_images = []
        matched_image_names = []
        for im_name in matches:
            matched_images.append(Image.objects.get(pk=im_name))
            matched_image_names.append(im_name)
        request.session['matches'] = matched_images
        store_location_information(request, matched_image_names)
        return render_to_response(
        'results.html',
        {'file': request.session.get('file'), 'matches': matched_images, 'num_results': len(matched_images)},
        context_instance=RequestContext(request)
        )



def color(request):
    if request.method == 'GET':
        matches = get_matches(request.session.get('file').id, feature_type='color')
        if len(matches) > 20:
            matches = matches[:20]
        matched_images = []
        matched_image_names = []
        for im_name in matches:
            matched_images.append(Image.objects.get(pk=im_name))
            matched_image_names.append(im_name)
        store_location_information(request, matched_image_names)
        return render_to_response(
        'results.html',
        {'file': request.session.get('file'), 'matches': matched_images, 'num_results': len(matched_images)},
        context_instance=RequestContext(request)
        )


def map(request):
    if request.method == 'GET':
        return render_to_response(
            'map.html',
            {'lat1': request.session.get('lat1'), 'long1': request.session.get('long1'), 'lat2': request.session.get('lat2'), 'long2': request.session.get('long2'),
             'lat3': request.session.get('lat3'), 'long3': request.session.get('long3'),
             'lat4': request.session.get('lat1'), 'long4': request.session.get('long4')}
        )



def search(request):
    if request.method == 'GET':
        if not request.session.get('matches'):
            request.session['matches'] = []

        return render_to_response(
        'results.html',
        {'file': request.session.get('file'), 'matches': request.session.get('matches'), 'num_results':
            len(request.session.get('matches'))},
        context_instance=RequestContext(request)
    )

def add_clue(request):
    if request.method == 'POST':
        newdoc = Document(docfile=request.FILES.get('file', False))
        if newdoc.docfile:
            newdoc.id = str(request.FILES.get('file').name)
            newdoc.save()
            request.session['file'] = newdoc

        return render_to_response(
            'clue.html',
            {'image': request.session.get('file')},
            context_instance=RequestContext(request)
        )

def submit_clue(request):
    if request.method == 'POST':
        titleList = request.POST.get('title').split('&')
        contentList = request.POST.get('content').split('&')
        markerlistList = request.POST.get('markerListData').split('&')

        for x in range(0, len(titleList)-1, 1):
            titleList[x]
            new_clue = Clue(clueTitle=titleList[x], clueContent=contentList[x], markerListData=markerlistList[x], imageId = "imageId", workerId = "workerId")
            new_clue.save()

    return render_to_response('clue.html',  context_instance=RequestContext(request))
