//================ Start config =====================================================================================
one = "one";
all = "all";
gray = "gray";
redLines = "redLines";

//  Required hashtag level start
const startLevelRitm = 1;
const startLevelINC = 1;

//  Required hashtag level depth
const endLevelRitm = 1;
const endLevelINC = 1;

//  The minimum number of hashtags for different tasks
// to coloring
const minHashtagCountRITM = 1;
const minHashtagCountINC = 1;

const sortEnableRITM = false;
const sortEnableINC = false;

const clearButtonRITM = true;
const clearButtonINC = true;

//  Disabling closing comments
//      Comments are disabled until there is one of the hashtags: one, until there are all hashtags: all or disabled: false
const disableCommentRitm = false;
const disableCommentInc = false;

//Appearance of the function to disable comments
// gray, redLines
const disableCommentTheme = gray;

//  Determine the background color of the appeal
const colorRITM = "#00c7000a";
const colorINC = "#ffebeb";

//  Different levels of hashtags
// you can add "maxElemINC" or "maxElemRITM" to decrease the minimum count
// const Hashtags = [
//     [
//         { name: "#УП", title: "Выполнено удалённо  или может быть выполнено удаленно." },
//         { name: "#локал", title: "Выполнено локально и не может быть выполнено по другому" },
//         // { name: "#SDA", title: "Для снятия статистики  установок ПО\ИС скриптами Дмитрия Свиридова" },
//         // { name: "#AC", title: "При использование Admin Cloud" },
//         // { name: "#РУК", title: "При установк​е ПО руками, нет автоматизации SCCM,AC,SDA" },
//         // { name: "#Беззаявки", title: "Используется при закрытии саморегов​" },
//         // { name: "#Car", title: "Используется,когда инженер для выполнения заявки едет на машине." },
//         // { name: "#Диагностика", title: "​Проверка ПК и периферийного оборудования на исправность и соответствие заявленной конфигурации" },
//         // { name: "#Профилактика", title: "Механическое удаление пыли и грязи с ПК и периферийного оборудования" },
//         // { name: "#Dly", title: "Обозначение того, что заявка попала к нам на группу с SLA более 75% либо уже сгоревшая." },
//         // { name: "#Itproblem", title: "Отмечаются проактивные работы по выгрузкам из SCCM и Zabbix СЛ ППКС, обычно присылается готовый шаблон в письме с списком активностей и хостов." },
//         // { name: "#УФИТ", title: "У пользователей заблокирован доступ к каким-либо сайтам на уровне нашего прокси сервера" },
//         // { name: "#Cisco ", title: "Любая заявка связанная с Cisco any connect" },
//     ],
//     // [
//     //     { name: "#SDA", title: "Для снятия статистики  установок ПО\ИС скриптами Дмитрия Свиридова" },
//     // ],
//     [
//         // { name: "#ПО", title: "Ошибки, вылеты, не правильная работа…" },
//         // { name: "#Железо", title: "Bsod, bad block, не включается…" },
//         // { name: "#Периферия", title: "Мыши, клавиатуры, гарнитуры, кабеля… " },
//         // { name: "#Сеть", title: "Нет сети, потеря пакетов, недоступность ресурсов" },
//         // { name: "#Печать", title: "Кончился картридж, дефекты печати" },
//         // { name: "#Маршрутизация", title: "Неверное назначение, нет возможности выполнить доступными средствами(локал\удаленка), требуется участие другой группы.", maxElemINC: 2 },
//         // { name: "#Неизвестно", title: "Причину установить не удалось​", maxElemINC: 1 },
//     ],
//     [
//         // { name: "#Установка", title: "Обращение выполнено через установку/переустановку ПО" },
//         // { name: "#Настройка", title: "Обращение выполнено настройкой/правкой" },
//         // { name: "#Консультация", title: "Оказана консультация по обращению" },
//         // { name: "#Проверка", title: "Обращение связано с проверкой или проблема не проявилась" },
//         // { name: "#Замена", title: "Инцидент устранён заменой модуля/оборудования" },
//     ],
// ];

// //  Response template
// const AnswersRitm = [
//     { name: "Доп РЗ", title: "Создано Доп РЗ" },
//     { name: "Ноте", title: "Установлена корпоративная операционная система на ноутбук " }
//     // { name: "#РУК", title: "ПО «наименование ПО» установлено. Ярлык на рабочем столе либо в меню Пуск." },
//     // { name: "#AC", title: "ПО «наименование ПО» установлено. ПО опубликовано на учетную запись пользователя, в дальнейшем, при смене компьютера в корпоративной сети ПО будет устанавливаться автоматически." },
// ];

// const AnswersINC = [
//     { name: "Маршрутизация", title: "Создано Доп РЗ" },
//     // { name: "Доп РЗ", title: "Создано Доп РЗ" },
// ];
//================ End config =====================================================================================