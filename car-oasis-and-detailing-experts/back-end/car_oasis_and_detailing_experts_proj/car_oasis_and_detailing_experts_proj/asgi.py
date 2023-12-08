"""
ASGI config for car_oasis_and_detailing_experts_proj project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'car_oasis_and_detailing_experts_proj.settings')

application = get_asgi_application()
