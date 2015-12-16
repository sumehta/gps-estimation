# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url
from django.views.generic import TemplateView
from django.views.generic import TemplateView
import views

urlpatterns = patterns('contextslices.photo.views',
    url(r'^list/$', 'list', name='list'),
    url(r'^search/$', 'search', name='search'),
    url(r'^color/$', 'color', name='color'),
    url(r'^map/$', 'map', name='map'),
    url(r'^gist/$', 'gist', name='gist'),
    url(r'^start/$', 'start', name='start'),

    # url(r'^map/', TemplateView.as_view(template_name='map.html'), name='results')


    url(r'^add_clue/$', 'add_clue', name='add_clue'),
    url(r'^submit_clue/$', 'submit_clue', name='submit_clue'),
)
