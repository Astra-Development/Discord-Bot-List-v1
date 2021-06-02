<p align="center">
  <img src="https://media.discordapp.net/attachments/846824301676068874/847413435129135124/logo.png" width="300">
</p>

<p align="center">
  <b>welkom bij Astra Bot List</b>
</p>

<p align="center">
    <br/><br/>
    <a href="https://discord.gg/sQQFSnQhdt" target="_blank">
        <img src="https://img.shields.io/discord/793149744847257600?label=SUPPORT%20SERVER&style=for-the-badge" alt="Discord" />
    </a>
</p>

<p align="center">
   Astra Bot List is een open-source!nt-tak die nieuwere toevoegingen/functies kan hebben, maar mogelijk ook meer bugs bevat of zelfs onveilig is. Gebruik op eigen risico. Als u problemen ondervindt, controleer dan eerst de veelgestelde vragen.
</p>

# Opstelling
Hernoem `example.config.json` naar `config.json`
Vul alle **Waarden**
Voer `npm i` . uit
Start de botlijst `npm start` :)

# Dashboardconfiguratie
**1.** Bezoek [Discord Developer Portal](https://discord.com/developers/applications)

**2.** Klik op je bot

**3.** Ga op `OAuth2`

**4.** Voeg bij `Redirects` uw website `domain/api/callback` [Bijv. `https://astrabots.xyz/api/callback`]

**5.** Klik op 'Opslaan'

# Alle afbeeldingslocatie
`src/public/assets/img/`
[Zorg ervoor dat u de namen behoudt zoals ze zijn]

# MongoURL-waarde
**1.** Bezoek [MongoDB](https://www.mongodb.com/)

**2.** Clutser maken

**3.** Klik op verbinden

**4.** Verbind uw applicatie en kopieer de code

**5.** Klik aan de linkerkant van MongoDB op `DataBase Access`

**6.** Toevoegen **Nieuwe databasegebruiker**

**7.** Voeg een aangepaste gebruikersnaam toe [Bijv. `LuckyTarget-gebruikersnaam`] en een wachtwoord [Bijv. `LuckyTarget-wachtwoord`]

**8.** Klik op de knop gebruiker toevoegen

**9.** Bezoek `config.json`

**10.** Bij `"mongo_url": ""` plak je de code die je hebt gekopieerd uit stap **4**

### **Zorg ervoor dat op `<gebruikersnaam>` & `<wachtwoord>` ze worden vervangen door wat u hebt gemaakt bij stap 6-8**

# Recaptcha_V2 Waarde
**1.** Bezoek [Google Recaptcha-website](https://www.google.com/recaptcha/admin/)

**2.** Klik op de knop 'Maken'

**3.** In het gedeelte 'label' kun je alles zetten wat je wilt

**4.** Selecteer `reCAPTCHA v2`

**5.** Voeg bij Domeinen het domein toe dat u heeft voor de **Botlijst** [Bijv. `astrabots.xyz`] > Klik op de **+**

**6.** Klik op de knop 'Verzenden'

![afbeelding](https://user-images.githubusercontent.com/39243722/118609705-ac2bf600-b7c3-11eb-9378-6770576dad25.png)
**7.** Na de knop 'Verzenden' gaat u naar een pagina die er ongeveer zo uitziet
![afbeelding](https://user-images.githubusercontent.com/39243722/118610249-3c6a3b00-b7c4-11eb-8eb6-15733fdeb656.png)
**8.** Kopieer `Site Key` & `Secret Key` en plak ze in het `config.json`-bestand

![afbeelding](https://user-images.githubusercontent.com/39243722/118610668-aedb1b00-b7c4-11eb-9eb7-a3fe931afb89.png)



# 📝 Verander de footer van de website niet!
![afbeelding](https://user-images.githubusercontent.com/39243722/120484161-7722c480-c3bb-11eb-8850-85a83bf3ab9d.png)
> Als ik je botlijst vind zonder de voettekst, ben je X_X

# Licentiekennisgeving
![Licentiekennisgeving](https://i.ibb.co/Q8vQDTs/image.png)