from rasa_sdk import Action
import requests, os
class ActionCreateLeave(Action):
    def name(self): return "action_create_leave"
    def run(self, dispatcher, tracker, domain):
        email="alice@example.com"
        payload={"user_email":email,"start_date":"2025-09-10","end_date":"2025-09-12","reason":"via bot"}
        requests.post(os.environ.get("BACKEND_URL","http://localhost:3000")+"/api/leaves/create",json=payload)
        dispatcher.utter_message("Leave requested.")
        return []
class ActionRequestAsset(Action):
    def name(self): return "action_request_asset"
    def run(self, dispatcher, tracker, domain):
        dispatcher.utter_message("Asset request sent.")
        return []
