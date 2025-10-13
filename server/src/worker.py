import asyncio
import pusherclient
import json
from src.config import secrets
from src.services.utils import send_email_to_student

def on_connect(data):
    print("[Worker] Connected to Pusher")
    channel = pusher_client.subscribe("email-channel")


    def email_handler(event_data):
        try:
            # Parse the JSON payload sent by Pusher
            payload = json.loads(event_data)

            asyncio.run(send_email_to_student(
                payload["email"],
                payload["subject"],
                payload["body"]
            ))
        except Exception as e:
            print("[Worker] Error processing event:", e)


    channel.bind("send-email-to-student", email_handler)
    print("[Worker] Bound to send-email-to-student")

# --- Patch host manually ---
pusherclient.Pusher.host = "ws-ap2.pusher.com"  # <— works even for old versions

pusher_client = pusherclient.Pusher(
    key=secrets.PUSHER_KEY,
)
pusher_client.connection.bind('pusher:connection_established', on_connect)
pusher_client.connect()

try:
    asyncio.get_event_loop().run_forever()
except KeyboardInterrupt:
    print("[Worker] Stopped manually")
