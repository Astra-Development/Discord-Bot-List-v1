# Welcome to LuckyBotList

Lucky Bot List is an open-source!nt branch may have newer additions/features, but is also potentially more buggy or even insecure. Use at your own risk. If you have any issues, check the FAQs first please.

### Website Preview [Website Link](https://luckybots.tk/)
### Do you need help? Join our [Discord Server](https://discord.gg/sQQFSnQhdt)

# ScreenShots
![image](/Setup/home-page.png)


![image](/Setup/bot-page.png)


![image](/Setup/profile-page.png)

# Setup
Rename `example.config.json` to `config.json`
Fill All the **Values**
Run `npm i`
Start the bot-list `npm start` :)

# Dashboard Setup
**1.** Visit [Discord Developer Portal](https://discord.com/developers/applications)

**2.** Click on your bot

**3.** Go on `OAuth2`

**4.** On `Redirects` add your website `domain/api/callback` [Eg. `https://luckybots.tk/api/callback`]

**5.** Click `Save`

# MongoURL Value
**1.** Visit [MongoDB](https://www.mongodb.com/)

**2.** Create Clutser

**3.** Click connect

**4.** Connect your application & copy the code

**5.** On the left side of MongoDB click on `DataBase Access`

**6.** Add **New database user**

**7.** Add a custom username [Eg. `LuckyTarget-username`] and a password [Eg. `LuckyTarget-password`]

**8.** Click the add user Button

**9.** Visit `config.json`

**10.** At `"mongo_url": ""` paste the code you copied from step **4**

### **Make sure on `<username>` & `<password>` to replace them with what you created on Step 6-8**

# Recaptcha_V2 Value
**1.** Visit [Google Recaptcha Website](https://www.google.com/recaptcha/admin/)

**2.** Click on `Create` button

**3.** On the `label` section you can put whatever you want

**4.** Select `reCAPTCHA v2`

**5.** On Domains, add the domain that you have for the **Bot List** [Eg. `luckybots.tk`] > Click the **+**

**6.** Click on `Submit` Button

![image](https://user-images.githubusercontent.com/39243722/118609705-ac2bf600-b7c3-11eb-9378-6770576dad25.png)
**7.** After `Submit` button you will be navigate to a page similar like this
![image](https://user-images.githubusercontent.com/39243722/118610249-3c6a3b00-b7c4-11eb-8eb6-15733fdeb656.png)
**8.** Copy `Site Key` & `Secret Key` and paste them on `config.json` file

![image](https://user-images.githubusercontent.com/39243722/118610668-aedb1b00-b7c4-11eb-9eb7-a3fe931afb89.png)

# License Notice
![License Notice](https://i.ibb.co/Q8vQDTs/image.png)
