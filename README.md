# TMA UI kit 3.0

```
╔═════════════════════════════════════════════╗
║        Документация к TMA UI kit 3.0        ║
╚═════════════════════════════════════════════╝
```

TMA UI kit 3.0 - это глобальное обновление Telegram Mini Apps user interface kit которое полностью адаптировано под новый дизайн Telegram for Android которое вышло 6 февраля 2026.

> Прошу обратить внимание, документация может содержать как грамматические так и практические ошибки, если заметили таковую прошу написать мне в телеграм @drok_off

> Если вы столкнулись с трудностями реализовать ваш интерфейс с помощью TMA ui kit, напишите мне в телеграм @drok_off, по рассмотрению я исправлю в следующем обновлении

![Обложка](images/aaa.png)

## Элементы интерфейса

<details>
<summary><strong>Screens</strong> -- экраны: могут открыватся и закрыватся поверх интерфейса, могут содержать любой элемент ниже, можно закрыть свайпом</summary>
<br>

Если у вас достаточно сложный интерфейс, нуждающийся в нескольких разделах: то на помощь придёт система экранов. Вы нажимаете на элемент: он с анимацией открывает экран который загораживает собой весь интерфейс и позволяет взаимодействовать с другим.

---
### Как создать экран?

Внутри ```<div class="page ___">``` (см пункт Начало работы) создайте контейнер ```<div data-screen="id" data-swipe class="screen hidden">```, назначьте ему id в атрибуте data-screen="id". Вкладывайте в него любые элементы TMA ui kit 3.0

---
### Как открыть?

Чтобы назначить элементу открытие экрана, добавьте ему атрибут data-open-screen="id". Ставить можно на любой элемент.

---
### Как закрыть?

1. Чтобы назначить элементу закрытие экрана, добавьте ему атрибут data-close-screen="id". Рекомендую создать header, и в левой кнопке с иконкой back назначить действие закрытия. Но назначить закрытие экрана можно также на любой элемент;
2. Второй вариант закрытия экрана - свайп. Назначьте родительскому контейнеру с data-screen="id", атрибут data-swipe, и экран получит возможность закрыватся свайпом слева направо.

---
### Пример

```
<body class="one-page">
    <div class="page secondary_bg">
        <section class="top">
            <!-- Элемент для открытия экрана -->
            <div class="item clicked" data-open-screen="1">
                <div class="right">
                    <div class="text oneline"> 
                        <div class="label body1">Открыть экран 1</div> 
                    </div>
                </div>
            </div>
        </section>
        <!-- Сам экран -->
        <div data-screen="1" data-swipe class="screen hidden">
            <!-- Header с кнопкой закрытия экрана -->
            <div class="header-wrapper header-bg">
                <div class="header">
                    <div class="header-left right-two">
                        <div class="header-capsule one-btn">
                            <div class="element-header" data-close-screen="1">
                                <svg class="back"><use href="#back"></use></svg>
                            </div>
                        </div>
                    </div>

                    <div class="header-center">
                        <div class="label headline6">Заголовок</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<body>
```

> В этом коде представлен item для открытия экрана, сам экран и header внутри него с кнопкой-иконкой back которая закрывает экран.
</details>

<details>
<summary><strong>Section</strong> -- оболочка для item-ов, можно установить заголовок и текст под сектором</summary>
<br>
Секторы позволяют заключать в разделы некоторые элементы, например item-ы. Добавлять заголовок с ссылкой, нижнюю надпись.

---
### Как создать?

Заключите нужные вам элементы в тег ```<section>```, если нужно добавьте отступы сверху или снизу, добавив классы ```<section class="top">``` или ```<section class="bottom">```.

---
### Элементы

Заключать в сектора можно некоторые элементы: item, ползунок, поле ввода, информационный блок. Но и у секторов есть конкретные элементы: заголовок, заголовок с кнопкой, footer.

<details>
<summary>Заголовок -- заголовок сектора</summary>

```
<section>
    <div class="item">
        <div class="right">
            <div class="title oneline"> 
                <div class="button1-medium">Заголовок</div> 
            </div>
        </div>
    </div>
</section>
```

</details>

<details>
<summary>Заголовок с ссылкой -- заголовок сектора слева, кнопка с ссылкой справа</summary>

```
<section>
    <div class="item">
        <div class="right">
            <div class="title oneline"> 
                <div class="button1-medium">Заголовок</div> 
            </div>
            <a href="#" class="second-title element">
                <div class="button1">Ссылка</div>
            </a>
        </div>
    </div>
</section>
```

</details>

<details>
<summary>Заголовок с ссылкой -- заголовок сектора слева, кнопка с ссылкой справа</summary>

```
<div class="item footer">
    <div class="right"> 
        <div class="subtitle2">Footer под сектором</div> 
    </div>
</div>
```

</details>

---
### Пример

```
<!-- Сам сектор -->
<section>
    <!-- Заголовок с ссылкой -->
    <div class="item">
        <div class="right">
            <div class="title oneline"> 
                <div class="button1-medium">Заголовок</div> 
            </div>
            <a href="#" class="second-title element">
                <div class="button1">Ссылка</div>
            </a>
        </div>
    </div>
    <!-- Элемент item -->
    <div class="item">
        <div class="right">
            <div class="text oneline"> 
                <div class="label body1">Да, это сектор с footer</div> 
            </div>
        </div>
    </div>
</section>
<!-- footer -->
<div class="item footer">
    <div class="right"> 
        <div class="subtitle2">Footer под сектором</div> 
    </div>
</div>
```
> В этом коде представлен сектор с footer, item-ом, заголовком с ссылкой

</details>

<details>
<summary><strong>Item</strong> -- большее количество элементов на любой странице занимают item-ы</summary>
<br>
Item - это один из главных элементов интерфейса Telegram Mini Apps, посмотрите на @Wallet, по этому я разрабатываю их и обновляю с самого начала TMA ui kit. Сам по себе элемент простой: левая + правая часть. В роли левой выступает обычно аватарка/иконка/ничего. В роли правой: текстовый блок (надпись/надпись+поднадпись/надпись+активный) и какой-то элемент.

---
### Как создать основу?

Скопируйте эту основу, мы будем её редактировать.

```
<div class="item">
    <div class="left">
    </div>
    <div class="right">
        <div class="text">  
        </div>
        <div class="element"> 
        </div>
    </div>
</div>
```

- Если вы хотите чтобы item имел эффект нажатия, добавьте класс ```<div class="item clicked">```
- Если после item идёт другой элемент, вы можете отделить его сепаратором ```<div class="right separator">```

---
### Как создать левую часть?

Как я уже сказал в левой части может быть три вида: аватарка, иконка или ничего (тогда вообще не создавайте контейнер с классом left).

<details>
<summary>Аватарка</summary>

```
<div class="left">
    <img src="" class="ava"> 
</div>
```
> Скопируйте код поменяв src, аватарка желательна квадратной.
</details>

<details>
<summary>Иконка</summary>

```
<div class="left">
    <svg class="link"><use href="#link"></use></svg>
</div>
```
> Скопируйте код поменяв class и href на вашу иконку (добавьте самостоятельно)
</details>

---
### Как создать текстовый блок правой части?

Текстовый блок делится на две части: одна надпись, две надписи:

<details>
<summary>Одна надпись</summary>

```
<div class="right">
    <div class="text oneline">  
        <div class="label body1">Надпись</div> 
    </div>
</div>
```
> Скопируйте код, рекомендую использовать шрифт body1 либо body1-medium
</details>

<details>
<summary>Две надписи</summary>
<br>
Просто поднадпись

```
<div class="right">
    <div class="text twoline"> 
        <div class="label body1">Надпись</div> 
        <div class="label subtitle subtitle1">Поднадпись</div> 
    </div>
</div>
```

Активный
```
<div class="right">
    <div class="text twoline"> 
        <div class="label body1">Надпись</div> 
        <div class="label active subtitle2">Активный</div>   
    </div>
</div>
```
</details>

---
### Как создать элементы правой части?

<details>
<summary>Кнопка</summary>

```
<div class="right separator">
    <!-- Надпись -->
    <div class="element"> 
        <a class="button subtitle2-medium">Кнопка</a>
    </div>
</div>
```

</details>

<details>
<summary>Radio button</summary>

```
<div class="right separator">
    <!-- Надпись -->
    <div class="element"> 
        <label class="radio-container">
            <input type="radio" checked="checked" name="radio1">
            <span class="radio-checkmark"></span>
        </label>
    </div>
</div>
```
> Есть пару важных моментов: если на одной странице несколько <u>разных</u> radio button, то к одному блоку нужно использовать один ```name="radio1"``` в input. Если нужен активный radio, то используйте ```checked="checked"``` в input.

</details>

<details>
<summary>Свитчер</summary>

```
<div class="right separator">
    <!-- Надпись -->
    <div class="element"> 
        <label class="switch">
            <input type="checkbox" checked="checked>
            <span class="slider"></span>
        </label>
    </div>
</div>
```
> Если нужен активный, используйте в input ```checked="checked"```
</details>

<details>
<summary>Надпись</summary>

```
<div class="right separator">
    <!-- Надпись -->
    <div class="element"> 
        <div class="label-hint body1">Надпись</div>
    </div>
</div>
```

</details>

<details>
<summary>Активная надпись</summary>

```
<div class="right separator">
    <!-- Надпись -->
    <div class="element"> 
        <div class="label-active body1">Надпись</div>
    </div>
</div>
```

</details>

<details>
<summary>Ссылка</summary>

```
<a href="https://link.com" class="item clicked">
    <div class="left">
    </div>
    <div class="right">
        <div class="text oneline">  
            <div class="label body1">Надпись</div> 
        </div>
        <div class="element">
            <svg class="link"><use href="#link"></use></svg>
        </div>
    </div>
</a>
```
> Вместо контейнера используйте ссылку у item, и в левой части иконку ссылки.
</details>
<br>
</details>

<details>
<summary><strong>Big header</strong> -- текстовый блок с большой иконкой, заголовком и текстом</summary>
<br>

Big header - это элемент информационного блока с большой картинкой, заголовком и поднадписью

---
### Как создать?

Скопируйте код и используйте в списке элементов. В ```<section></section>``` вставлять не нужно.
```
<div class="big-header">
    <img src="">
    <div class="big-header-title label headline6"></div>
    <div class="label body1"></div>
</div>
```

> Вставьте src картинки, укажите заголовок и надпись
</details>

<details>
<summary><strong>Header</strong> -- блок который расположен вверху страницы и даёт постоянный доступ к важным функциям: поиск или настройки. Может иметь заголовок, либо надпись + поднадпись</summary>
<br>
Header - это панель сверху экрана, создаётся по желанию, состоит из трёх частей: левая, центральная, правая.

---
### Как создать?

Используйте этот код как основу, сейчас мы будем его редактировать

```
<div class="header-wrapper header-bg">
    <div class="header">
        <div class="header-left">
        </div>

        <div class="header-center">
        </div>

        <div class="header-right">
        </div>
    </div>
</div>
```

> Класс ```header-bg``` используется для аккуратного скрытия фона под header, по желанию можно убрать, если у вас непрокручиваемый интерфейс 

---
### Как создать левую часть?

В левой части обычно используется кнопка "Назад" либо "Закрыть", но вы можете указать там любую иконку.

> Создавать левую часть не обязательно, в таком случае удалите контейнер ```<div class="header-left"></div>```

Скопируйте этот код и вставьте внутрь контейнера ```<div class="header-left"></div>```

```
<div class="header-capsule one-btn">
    <div class="element-header">
        <svg class="back"><use href="#back"></use></svg>
    </div>
</div>
```

- Если вы используете больше 1 кнопки, класс ```one-btn``` желательно убрать
- Желательно создавать до 3 кнопок

Чтобы использовать больше 1 кнопки, дублируйте контейнер ```<div class="element-header">``` вместе с его содержимым

---
### Как создать центральную часть?

В центральной части используется заголовок или блок item.

> Создавать центральную часть не обязательно, в таком случае удалите ```<div class="header-center"></div>```, и не используйте ```<div class="header-right"></div>```. Добавьте в контейнер с классом ```header-wrapper``` ещё один класс ```stick```, тогда header прилипнет к части интерфейса ниже

<details>
<summary>Просто заголовок</summary>

Если хотите использовать просто заголовок скопируйте этот код и вставьте в ```<div class="header-center"></div>```

```
<div class="label headline6">Заголовок</div>
```

</details>

<details>
<summary>Заголовок в капсуле</summary>

Если хотите использовать заголовок в капсуле, скопируйте этот код и вставьте в ```<div class="header-center-two header-capsule"></div>``` вместо ```<div class="header-center"></div>```

```
<div class="label headline6">Заголовок</div>
```

> По желанию, можете добавить эффект нажатия, добавив класс ```clicked``` в ```<div class="header-center-two header-capsule"></div>```

</details>

<details>
<summary>Item</summary>

Если хотите использовать item, используйте любой код из пункта item и вставьте его в ```<div class="header-center-two header-capsule"></div>``` вместо ```<div class="header-center"></div>```

> Внимание! Не используйте в таком случае часть item с элементом

</details>

---
### Как создать правую часть?

В правой части используются кнопки с иконками, от 1 до 4 включительно.

> Создавать левую часть не обязательно, в таком случае удалите контейнер ```<div class="header-right"></div>```
> Если нужно использовать правую часть, и не использовать центральную, оставьте ```<div class="header-center"></div>```, но удалите всё его содержимое

Скопируйте этот код и вставьте внутрь контейнера ```<div class="header-right"></div>```

```
<div class="header-capsule one-btn">
    <div class="element-header">
        <svg class="menu"><use href="#menu"></use></svg>
    </div>
</div>
```

- Если вы используете больше 1 кнопки, класс ```one-btn``` желательно убрать
- Желательно создавать до 4 кнопок

Чтобы использовать больше 1 кнопки, дублируйте контейнер ```<div class="element-header">``` вместе с его содержимым

</details>

<details>
<summary><strong>Tabs</strong> -- Обыкновенные вкладки, важная часть любого интерфейса: могут быть трёх видов: пролистываемые, статичные во всю ширину, статичные, содержимое вкладок можно листать свайпом</summary>

---
### Шаблон

Скопируйте шаблон, будем его редактировать:

```
<div class="tab-header header-capsule">
    <div class="tab subtitle1-medium actives" data-tab="Ваш номер"><span>Ваша надпись</span></div>
</div>
```

Активную вкладку помечает класс ```actives```, номер вкладки ```data-tab="1"```,

- Активную вкладку пометьте классом ```actives```
- У каждой вкладки должен быть номер, отметьте его в атрибуте ```data-tab="1"```
- Надпись на вкладке поместите в тег ```<span></span>```

> Если на странице/экране уже создан контейнер ```<div class=header-wrapper></div>```, то вставьте шаблон в него, иначе создайте контейнер вместе с ним.

---
### Вид вкладок

> Сейчас мы говорим о самом элементе интерфейса: панели переключения вкладок, о контенте вкладок говорим ниже.

После создания шаблона, разбираемся о виде вкладок:

| Стиль | Описание | Количество вкладок |
| :--- | :--- | :--- |
| `usual` | Во всю ширину экрана | меньше 5 |
| `central` | Адаптивная ширина | меньше 5 |
| `adaptive` | Прокручиваемые | больше 5 |

Выбранный вами класс, поместите в ```<div class="tab-header header-capsule [ usual / central / adaptive ]">```

---
### Контент вкладок

Поместите на странице/экране под вкладками (между могут быть элементы), этот контейнер:

```
<div class="tab-container-slider">
</div>
```

Внутри, в контейнере ```<div class="tab-slide" id="1"></div>```, поместите контент который вам нужен в этой вкладке. 

В атрибуте id, укажите id вкладки

</details>

<details>
<summary><strong>Alert</strong> -- встроенный alert, но очень ограниченный. Заголовок + надпись, и кнопки: Ок, ок + отмена, отмена + удалить</summary>
<br>
Alert - это уведомление появляющееся на экране, не даёт взаимодействовать с интерфейсом, даёт доступ к кнопкам, надписи и поднадписи. Можно закрыть тапом по кнопке или тапом по экрану вне alert.

---
### Как создать?

Используйте функцию ```d_alert("Заголовок", "Описание", "ok");```, например в атрибуте onclick у любого кликабельного элемента.

1. Аргумент функции - заголовок
2. Аргумент функции - описание alert
3. Аргумент функции - ряд кнопок:
    - "ok" - одна кнопка ок
    - "ok_cancel" - две кнопки ок и отмена
    - "cancel_delete" - две кнопки отмена и удалить

</details>

<details>
<summary><strong>Profile block</strong> -- блок профиля, аватар + заголовок + надпись, может содержать иконки на фоне. Можно создать контейнер для выбора цвета блока профиля - например для настроек</summary>
<br>

Profile block - это блок профиля не нуждающийся в ```<section></section>```, в нём можно разметить аватарку, надпись и поднадпись, обычный либо градиентный фон, эмодзи на фоне, кнопки и radio-кнопки для выбора градиента кнопки.

---
### Как создать?

Скопируйте шаблон обычного профильного блока

```
<div id="[ Ваш id ]" class="profile-block s-img defult">
    <div class="avatar"><img src="[ путь до аватарки ]"></div>
    <div class="text headline6">Надпись</div>
    <div class="subname subtitle1">Поднадпись</div>
</div>
```

> Если вы будете менять цвет градиента при помощи radio-кнопок, задайте уникальный html-атрибут id
> Класс ```defult``` можно заменить на любой из цветов: ```blue, green, yellow, red, purple, cyan, pink, grey```, тогда это будет градиент

##### Или используйте шаблон для профильного блока с эмодзи

```
<div id="[ Ваш id ]" class="profile-block s-img defult">
    <div class="avatar"><img src="[ путь до аватарки ]"></div>
    <div class="text headline6">Надпись</div>
    <div class="subname subtitle1">поднадпись</div>

    <div class="icon sma cen" style="top: 39%; left: 22%;"><img class="img_prfl_blck"></div>
    <div class="icon sma cen" style="top: 39%; right: 19%;"><img class="img_prfl_blck"></div>
    <div class="icon big" style="top: 24%; left: 30%;"><img class="img_prfl_blck"></div>
    <div class="icon big" style="top: 24%; right: 28%;"><img class="img_prfl_blck"></div>
    <div class="icon big" style="top: 54%; left: 30%;"><img class="img_prfl_blck"></div>
    <div class="icon big" style="top: 54%; right: 28%;"><img class="img_prfl_blck"></div>
    <div class="icon sre" style="top: 4%; left: 50%; transform: translateX(-35%);"><img class="img_prfl_blck"></div>
    <div class="icon sre" style="top: 72%; left: 50%; transform: translateX(-35%);"><img class="img_prfl_blck"></div>
    <div class="icon sma" style="top: 6%; left: 33%;"><img class="img_prfl_blck"></div>
    <div class="icon sma" style="top: 74%; left: 33%;"><img class="img_prfl_blck"></div>
    <div class="icon sma" style="top: 74%; right: 31%;"><img class="img_prfl_blck"></div>
    <div class="icon sma" style="top: 6%; right: 31%;"><img class="img_prfl_blck"></div>
    <div class="icon smaa" style="top: 12%; right: 16%;"><img class="img_prfl_blck"></div>
    <div class="icon smaa" style="top: 63%; left: 19%;"><img class="img_prfl_blck"></div>
    <div class="icon smaa" style="top: 12%; left: 19%;"><img class="img_prfl_blck"></div>
    <div class="icon smaa" style="top: 63%; right: 16%;"><img class="img_prfl_blck"></div>
    <div class="icon smaaa" style="top: 39%; right: 7%;"><img class="img_prfl_blck"></div>
    <div class="icon smaaa" style="top: 39%; left: 11%;"><img class="img_prfl_blck" ></div>
</div>
```

### Использование кнопок внутри блока профиля

Используйте этот шаблон, перенесите класс цвета, перенесите код

```
<div id="profileBlock3" class="big-profile-block { класс чтобы задать цвет перемещается сюда }">
    <!-- Ваш код из пункта выше -->
    <div class="buttons">
        <a class="button-link caption2-medium">
            <span class="button-icon"><svg class="settings"><use href="#settings"></use></svg></span>
            <span class="button-text">Надпись</span>
        </a>
        <a class="button-link caption2-medium">
            <span class="button-icon"><svg class="settings"><use href="#settings"></use></svg></span>
            <span class="button-text">Надпись</span>
        </a>
        <a class="button-link caption2-medium">
            <span class="button-icon"><svg class="settings"><use href="#settings"></use></svg></span>
            <span class="button-text">Надпись</span>
        </a>
    </div>
</div>
```

### Выбор цвета градиента с помощью полосы radio-кнопок

1. Используйте этот шаблон под блоком профиля

```
<section class="top">
    <div class="color-row">
        <input type="radio" name="color" id="c-blue"  value="blue" data-color="blue">
        <label for="c-blue" class="swatch swatch-blue">
        <span class="dot"></span>
        </label>

        <input type="radio" name="color" id="c-green" value="green" data-color="green">
        <label for="c-green" class="swatch swatch-green">
        <span class="dot"></span>
        </label>

        <input type="radio" name="color" id="c-yellow" value="yellow" data-color="yellow">
        <label for="c-yellow" class="swatch swatch-yellow">
        <span class="dot"></span>
        </label>

        <input type="radio" name="color" id="c-red" value="red" data-color="red" checked>
        <label for="c-red" class="swatch swatch-red">
        <span class="dot"></span>
        </label>

        <input type="radio" name="color" id="c-purple" value="purple" data-color="purple">
        <label for="c-purple" class="swatch swatch-purple">
        <span class="dot"></span>
        </label>

        <input type="radio" name="color" id="c-cyan" value="cyan" data-color="cyan">
        <label for="c-cyan" class="swatch swatch-cyan">
        <span class="dot"></span>
        </label>

        <input type="radio" name="color" id="c-pink" value="pink" data-color="pink">
        <label for="c-pink" class="swatch swatch-pink">
        <span class="dot"></span>
        </label>

        <input type="radio" name="color" id="c-grey" value="grey" data-color="grey">
        <label for="c-grey" class="swatch swatch-grey">
        <span class="dot"></span>
        </label>
    </div>
</section>
```

2. Создайте js код, задав в нём id вашего профильного блока

```
(function(){
  const profile = document.getElementById('{ Ваш id профильного блока }');
  const radios = document.querySelectorAll('.color-row input[type="radio"]');
  const colorClasses = ['red','yellow','purple','green','blue','cyan','pink','grey'];

  function applyColorFromChecked(){
    const checked = document.querySelector('.color-row input[type="radio"]:checked');
    if(!checked) return;
    const cls = checked.dataset.color;
    profile.classList.remove(...colorClasses);
    if (cls) profile.classList.add(cls);
  }

  radios.forEach(r => r.addEventListener('change', applyColorFromChecked));
  applyColorFromChecked();
})();
```

3. Уберите цветовой класс у ```big-profile-block``` или ```profile-block```

</details>

<details>
<summary><strong>Input</strong> -- поле ввода, может быть с предустановленным текстом, также есть возможность установить лимит</summary>

---
### Как создать?

Здесь всё вообще легко, нужно выбрать один из трёх, нужный вам input, заключить его в ```<section></section>```, задать параметры (они оформлены {}) и готово!

<details>
<summary>Обычный</summary>

Скопируйте шаблон и задайте параметры: надпись

```
<div class="input-container">
    <input type="text" class="input-field" spellcheck="false" placeholder="{ Ваша надпись }">
    <label class="input-label">{ Ваша надпись }</label>
    <button type="button" class="clear-button"><svg class="close2"><use href="#close2"></use></svg></button>
</div>
```
</details>

<details>
<summary>С лимитом</summary>
Скопируйте шаблон и задайте параметры: надпись, лимит

```
<div class="input-container">
    <input type="text" class="input-field" data-limit="{ Ваш лимит, int }" spellcheck="false" placeholder="{ Ваша надпись }">
    <label class="input-label">{ Ваша надпись }</label>
    <button type="button" class="clear-button"><svg class="close2"><use href="#close2"></use></svg></button>
</div>
```

> Создать лимит можно для любого Input, просто задайте для тега ```<input>```, атрибут ```data-limit```
</details>

<details>
<summary>С предустановленным</summary>
Скопируйте шаблон и задайте параметры: надпись, предустановленный нередактируемый текст

```
<div class="input-container">
    <input type="text" class="input-field has-text" spellcheck="false" data-prefilled="{ Ваш предустановленный текст }">
    <label class="input-label">{ Ваша надпись }</label>
    <button type="button" class="clear-button"><svg class="close2"><use href="#close2"></use></svg></button>
</div>
```
</details>
<br>
</details>

<details>
<summary><strong>Modal window</strong> -- панель открывающаяся снизу, может содержать элементы выше, можно закрыть свайпом или кнопкой в header</summary>
<br>
Modal window - это всплывающее окно появляющееся снизу вверх с анимацией, и также закрыть свайпом сверху вниз. В нём можно размещать любые элементы TMA ui kit 3.0

---
### Как создать?

1. Назначьте элемент, элементом открытия modal window, добавив к нему html-атрибут ```data-open-overlay="{ id }"```
2. Создайте вне ```<body class="one-page">```(желательно снизу) шаблон ниже

```
<div class="overlay-container" data-overlay="{ id }">
    <div class="profile-modal">
        <div class="header-wrapper">
            <div class="header">
                <div class="header-left">
                    <div class="header-capsule one-btn" data-close-overlay="{ id }">
                        <div class="element-header">
                            <svg class="close"><use href="#close"></use></svg>
                        </div>
                    </div>
                </div>

                <div class="header-center">
                    <div class="label headline6">Ваш заголовок</div>
                </div>

                <div class="header-right">
                    <div class="header-capsule one-btn">
                        <div class="element-header">
                            <svg class="menu"><use href="#menu"></use></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Ваш код -->
    </div>
</div>
```

> Этот код создаёт модальное окно и header с кнопками закрыть, заголовком и кнопкой с иконкой меню

---
### Как закрыть?

- Закрыть можно свайпом
- Закрыть модальное окно можно при помощи элемента с атрибутом data-close-overlay="{ id }"
</details>

<details>
<summary><strong>Search panel</strong> -- панель поиска с размытием, позволяет вводить текст и очищать его по крестику</summary>

---
### Как создать?

Скопируйте html код, измените placeholder по желанию, добавьте свой html id в ```<input>```, для взаимодействий с js

```
<div class="header-wrapper header-bg">
    <div class="header-capsule search-container">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" class="search-input" placeholder="Поиск чатов" spellcheck="false">
        <button type="button" class="clear-btn" aria-label="Очистить поиск">
            <svg class="close1"><use href="#close1"></use></svg>
        </button>
    </div>
</div>
```
</details>

<details>
<summary><strong>Trackbar</strong> -- ползунок позволяющий быстро задавать значение из заданного диапазона</summary>
<br>
Trackbar - элемент интерфейса, занимает пространство как item, позволяет задать значение из заданного диапазона, создаётся максимально легко, копируете html и меняете диапазон, добавляете id для js и всё работает + есть надпись с выводом текущего значения

---
### Как создать?

Скопируйте код и по желанию вставьте в ```<section></section>```
Поменяйте атрибуты min, max, value, step на свои значения

```
<div class="slider-container">
    <input type="range" id="mySlider" min="0" max="20" value="10" step="1">
    <span id="sliderValue" class="slider-value">10</span>
</div>
```

</details>

<details>
<summary><strong>Context menu</strong> -- выпадающее меню, бывает двух типов: выбор элемента или перечень item-ов, из элементов: item (иконка + надпись), сепаратор, надпись, item-danger</summary>

---
### Как создать?

1. Создайте в теге ```<body class="one-page">``` контейнер:

```
<div id="tagDropdown" class="tag-dropdown"></div>
```

2. Определитесь с выбором какое нужно контекстное меню:

- **C выбором**: выбор из перечня item-ов
- **Обычный**: просто перечень item-ов

3. Создайте список пунктов для контекстного меню в таком формате:

| Заголовок | Название списка в js | Пример js-списка | Передаваемые аргументы
| :--- | :--- | :--- | :--- |
| **С выбором** | ```list_items_mark_{ id } = []``` | ```var list_items_mark_{ id } = [{ label: "Первый пункт" }];``` | ```label``` |
| **Обычный** | ```list_items_icon_{ id } = []``` | ```var list_items_icon_{ id } = [{ label: "Надпись", link: "#", icon: 'copy' }``` | ```label, icon, link/onclick, danger/-, separator/-``` |

4. Назначьте один из элементов, элементом открытия контекстного меню, добавив ему ```id="cntxt_menu_btn_{ id }"```, вид не имеет значения, вы указываете лишь id

---
### Примеры

C выбором

```
var list_items_mark_01 = [
    { label: "Первый пункт" },
    { label: "Второй пункт" },
    { label: "Третий пункт" }
];
```

Обычный

```
var list_items_icon_02 = [            
    { label: "Надпись", link: "#", icon: 'copy' },
    { label: "Надпись", link: "#", icon: 'lock' },
    { label: "Надпись", link: "#", icon: 'settings3' },
    { separator: true },
    { label: "Удалить", danger: true, onclick: "d_pop('Удалено', 'Удалено', 'Надпись');", icon:'delete' },
];
```

</details>

<details>
<summary><strong>Info block</strong> -- информационный блок представляющий из себя таблицу: иконка + надпись + поднадпись</summary>
<br>
Info block - это таблица состоящая из двух столбиков: иконка и (надпись + описание). Линий можно создавать неограниченное количество, только зачем?..

---
### Как создать?

Создайте Section (см пункт Section), внутрь поместите этот шаблон.

```
<div class="info_block">
    <div class="icon_info_block"><svg class=""><use href="#"></use></svg></div>
    <div class="text_info_block">
        <div class="label button1-medium">[ Ваша надпись ]</div>
        <div class="subtitle subtitle2">[ Ваше описание ]</div>
    </div>
</div>
```

- Задайте иконку (см пункт "Как создавать иконки?")
- Задайте надпись, описание

> Чтобы создать новую линию продублируйте блоки с классами icon_info_block и text_info_block.
</details>

<details>
<summary><strong>Bottom sheet</strong> -- уведомление появляющееся снизу, содержит иконку, заголовок и надпись, можно смахнуть свайпом</summary>
<br>

Bottom sheet - уведомление появляющееся снизу с анимацией всплытия снизу вверх. Содержит иконку, надпись+поднадпись и кнопку-надпись, можно смахнуть свайпом чтобы закрыть или дождатся пока оно закроется само.

---
### Как создать?

Используйте функцию ```d_pop("Заголовок", "Описание", "Надпись на кнопке", "name_icon");```, например в атрибуте onclick у любого кликабельного элемента.

1. Аргумент функции - заголовок
2. Аргумент функции - описание
3. Аргумент функции - надпись на кнопке-надписи
4. Аргумент функции - название иконки которая должна отображатся слева уведомления (указывать не обязательно, тогда будет использоватся иконка по умолчанию)
</details>


## Начало работы

1. Установите все css и js файлы
2. Подключите их
3. Создайте html структуру
```
<body class="one-page">
    <div class="page ___"> 
    </div>
</body>
```
| Стиль | Условие |
| :--- | :--- |
| `page secondary_bg` | Если используете section внутри page |
| `page defult_bg` | Если не используете section внутри page |

4. Можете создавать элементы по инструкциям выше

## Как устанавливать шрифты?

В TMA ui kit за основу используется шрифт Roboto, в этой главе я расскажу именно о подшрифтах Roboto которые используются в TMA ui kit.

Лицезреть шрифты можно в демонстрационном мини-приложении, в разделе "Шрифты"

| Подшрифт | Места использования |
| :--- | :--- |
| Headline6 | Заголовки |
| Headline5 | Заголовки поменьше |
| body1 | Item, описания, надписи |
| body1-medium | Item, описания, надписи |
| subtitle1 | Поднадписи |
| subtitle1-medium | Поднадписи |
| subtitle2 | Активный |
| subtitle2-medium | Заголовки поменьше |
| button1 | Ссылки разделов |
| button1-medium | Кнопки, заголовки разделов |
| caption1 | Элементы |
| caption1-medium | Элементы |
| caption2 | Элементы |
| caption2-medium | Элементы |

> Места использования шрифта не окончательные, вы попрежнему можете добавить для item шрифт заголовка, здесь уже вопрос красоты...

## Как создавать иконки?

Логично использовать для интерфейсов построенные на Telegram Mini Apps ui kit-e, иконки самого Telegram, я беру их из эмодзи-пака (t.me/addemoji/TgAndroidIcons)

> Скачать такие эмодзи можно в телеграм боте @SVG5926TGSBOT, работаю с ним уже год, работает отлично!

1. Когда вы получили полный svg, вырежьте из него весь мусор, оставив только ```<path></path>```
2. Скопируйте заготовку и вставьте ```<path></path>``` в тег ```<symbol></symbol>```
```
<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <symbol id="[ ваш id ]" viewBox="[ ваш viewBox ]"> </symbol>
</svg>
```
3. Используйте иконку в формате ```<svg class="[ ваш_css ]"><use href="#[ ваш id ]"></use></svg>```

> Для всех остальных иконок копируйте тег symbol
> Можете использовать иконки как раньше, просто вставляя svg, мой способ лучше работает с большим количеством одинаковых иконок



