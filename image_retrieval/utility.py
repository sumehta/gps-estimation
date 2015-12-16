__author__ = 'sneha'

from math import cos, sin, radians

def convert_to_cartesian(lat=0, long=0, R=0):
    x = R*cos(radians(long))*cos(radians(lat))
    y = R*cos(radians(lat))*sin(radians(long))
    z = R*sin(radians(lat))

    return x,y,z

