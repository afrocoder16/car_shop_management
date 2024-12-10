from django.apps import AppConfig


class CustomerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'customer'
<<<<<<< HEAD

    def ready(self):
        import customer.signals  # Import the signals module
=======
>>>>>>> 3841b5ee0dea5ed205e588e00373022c4b8d36e5
