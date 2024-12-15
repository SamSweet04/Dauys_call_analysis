from django.urls import path
from . import views

urlpatterns = [
    path('analyze_audio/', views.analyze_audio, name='analyze_audio'),
]
