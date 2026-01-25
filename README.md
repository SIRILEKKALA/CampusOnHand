## CampusOnHand
**CampusOnHand** is a web-based portal designed to streamline student-faculty interaction in colleges. It allows students to view faculty profiles, knowledge domains, and weekly timetables, helping them identify free slots and communicate professionally. Faculty can receive messages via their college email and update schedules manually.

**Built with Gemini AI Studio assistance.**

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1czhs6EHpc6ZFGXmbHwKgmDSa_3svN1NT

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
=======

## Features

- **College Home Page & Department List:**  
  Select a department to view all faculty profiles by designation.  

- **Faculty Profiles:**  
  Displays name, college email, room number, designation, research areas, interests, and knowledge domains.  

- **Weekly Timetable:**  
  Students can see faculty schedules and free slots for meetings.  

- **Messaging System:**  
  Students can send polite, professional messages; faculty receive notifications via college email.  

- **Faculty Management:**  
  Faculty can update their timetable manually or mark themselves on leave; default schedule is Monday to Saturday.  

- **Authentication:**  
  Only college email IDs are allowed for login to ensure secure communication.  

## Future Enhancements

- **Biometric Integration:**  
  Automatically track faculty presence using fingerprint or face recognition, eliminating the need for manual leave updates.  

- **Smart Notifications:**  
  Notify students only when faculty are actually available.  

- **Analytics & Reporting:**  
  Track student-faculty interactions and optimize faculty office hours.  

## Technology Stack (Suggested)

- **Frontend:** React.js / React Native  
- **Backend:** Node.js with Express / Django / Flask  
- **Database:** MongoDB / PostgreSQL / Firebase  
- **Authentication:** College Email OAuth / Firebase Auth  
- **Notifications:** Email via SMTP / Firebase Cloud Messaging  

## Impact

CampusOnHand reduces student frustration from wasted visits, improves transparency of faculty availability, encourages professional communication, and streamlines departmental management of faculty schedules.
>>>>>>> ece67f1a342a7753c9119ce81c7e7b89869b805d
