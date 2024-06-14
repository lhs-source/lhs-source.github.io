---
title: 안드로이드 노티피케이션 번들 데이터 최신화 Android Notification Bundle Data
description: 안드로이드 노티피케이션을 터치해 액티비티를 진입할 때 onCreate 에서 전달받는 데이터가 원치 않는 값으로 들어온다. 해결 방법을 찾아보자.
tags: Android, Android Notification
created: 2023-09-07
updated: 2023-09-07
---

```kotlin
fun sendNoti(title: String, message: String, data: Map<String, String>) {  
    val intent = Intent(this, MainActivity::class.java).apply {  
        flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP
        data.get("key")?.let {value -> 
            this.putExtra("key", value)
        }
    }
    val pendingIntent = PendingIntent.getActivity(this, 0, intent, FLAG_MUTABLE) 
    val notificationBuilder = NotificationCompat.Builder(this, channelId)
        .setContentIntent(pendingIntent)  
}
```

이렇게 넣어주었는데, 노티를 띄울 때는 
`intent Bundle[{key=newvalue}]` 
로 표시되고 onCreate 에서 노티 데이터를 받았을 때는 
`bundle Bundle[{key=oldvalue}]` 로 표시된다.

가장 최근으로 띄운 노티의 데이터가 아닌, 이젠 노티의 데이터를 사용하는 듯 하다.

[Android keeps caching my intents Extras, how to declare a pending intent that keeps fresh extras? - Stack Overflow](https://stackoverflow.com/a/3140497)

가장 최신의 노티 데이터를 항상 덮어 쓰게끔 하면 된다!
1. `FLAG_UPDATE_CURRENT` 플래그를 사용하고
2. `requestCode` 를 0 고정 값이 아니라 유니크한 값으로 지정해주면 된다.

```kotlin
val pendingIntent = PendingIntent.getActivity(this, System.currentTimeMillis().toInt(), intent, FLAG_MUTABLE)
```

우선은 별다른 규칙 없이 현재 타임스탬프를 지정해주니까, 내가 넣어준 마지막 값으로 잘 들어온다.



