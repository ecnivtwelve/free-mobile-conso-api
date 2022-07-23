![image](https://user-images.githubusercontent.com/32978709/180616181-925c8e35-945e-4616-971a-f5745a1588b5.png)
Pupeeter based Node.js API to get usage and other data from french carrier "Free Mobile"

# API Reference
A web version is available here : https://free-mobile-conso-api.herokuapp.com/

## Get current usage
Use this url : `https://free-mobile-conso-api.herokuapp.com/conso?user=**login**&pass=**password**`
###### replace `**login**` and `**password**` with your Free Mobile dashboard credentials

### Response example
```json
[
  {
    "first_name": "Pierre",
    "phone_number": "06 07 08 09 10",
    "conso": [
      {
        "data": [
          {
            "usedMo": 354.21,
            "totalMo": 50,
            "hors_forfaitEUR": 12.96
          }
        ]
      }
    ]
  }
]
```

## Get voicemail
Use this url : `https://free-mobile-conso-api.herokuapp.com/messagerie?user=**login**&pass=**password**`
###### replace `**login**` and `**password**` with your Free Mobile dashboard credentials

### Response example
```json
[
  {
    "number": "06 07 08 09 10",
    "dateString": "samedi 25 juin 2022 12:49:43",
    "length": "1m 16s",
    "audioURL": "https://mobile.free.fr/account/messagerie-vocale/message_vocal?id=567456456"
  },
  {
    "number": "07 08 09 10 11",
    "dateString": "vendredi 24 juin 2022 15:33:52",
    "length": "6s",
    "audioURL": "https://mobile.free.fr/account/messagerie-vocale/message_vocal?id=654425742"
  }
]
```
###### note that AudioURL needs a browser signed into your Free Mobile account to work.
