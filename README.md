# Welcome to LuckyBotList

Lucky Bot List is an open-source!nt branch may have newer additions/features, but is also potentially more buggy or even insecure. Use at your own risk. If you have any issues, check the FAQs first please.

### Website Preview [Website Link](https://luckybots.tk/)
###Do you need help? Join our [Discord Server](https://discord.gg/sQQFSnQhdt)

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
- Visit [Discord Developer Portal](https://discord.com/developers/applications)
- Click on your bot
- Go on `OAuth2`
- On `Redirects` add your website `domain/api/callback` [Eg. `https://luckybots.tk/api/callback`]
- Click `Save`

# MongoURL Value
- Visit [MongoDB](https://www.mongodb.com/)
- Create Clutser
- Click connect
- Connect your application
- Copy the code [ `mongodb+srv://<username>:<password>@cluster0.yeo01.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` ]
- On the left side of MongoDB click on `DataBase Access`
- Add **New database user**
- Add a custom username [Eg. `LuckyTarget-username`] and a password [Eg. `LuckyTarget-password`]
- Click the add user Button
- Visit `config.json`
- Add on `"mongo_url": ""` this -> `mongodb+srv://LuckyTarget-username:LuckyTarget-password@cluster0.yeo01.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
### **Make sure on `<username>` & `password` to replace them with what you created on the `DataBase Access`**

# Recaptcha_V2 Value
- Visit [Google Recaptcha Website](https://www.google.com/recaptcha/admin/)
- Click on `Create` button
- On the `label` section you can put whatever you want
- Select `reCAPTCHA v2`
- On Domains, add the domain that you have for the **Bot List** [Eg. `luckybots.tk`] > Click the **+**
- Click on `Submit` Button
![image](https://user-images.githubusercontent.com/39243722/118609705-ac2bf600-b7c3-11eb-9378-6770576dad25.png)
- After `Submit` button you will be navigate to a page similar like this
![image](https://user-images.githubusercontent.com/39243722/118610249-3c6a3b00-b7c4-11eb-8eb6-15733fdeb656.png)
- Copy `Site Key` & `Secret Key` and paste them on `config.json` file

![image](https://user-images.githubusercontent.com/39243722/118610668-aedb1b00-b7c4-11eb-9eb7-a3fe931afb89.png)



# 📝 Do not change the footer of the website!
![image](https://user-images.githubusercontent.com/39243722/118507353-d4214800-b736-11eb-8511-19cebb50e0ff.png)
> If i find your botlist without the footer you are X_X

# License Notice
![License Notice](https://i.ibb.co/Q8vQDTs/image.png)
