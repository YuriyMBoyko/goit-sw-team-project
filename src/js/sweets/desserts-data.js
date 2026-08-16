export async function fetchDessertsByCategory(category, page, limit) {
  const data = (typeof category !== 'string') ? []: (
    ((category === '') 
      ? dessertsData.desserts
      : dessertsData.desserts.filter((dessert) => (dessert.category._id === category))
    ).slice((page - 1) * limit, page * limit)
  );

  return {
    "desserts": data,
    "totalItems": ((category === '') ? dessertsData.desserts : dessertsData.desserts.filter((dessert) => (dessert.category._id === category))).length,
    "page": page,
    "limit": limit
  };
}

const dessertsData = {
  "desserts": [
    {
      "_id": "6852a9fcb459460cb6b47720",
      "name": "Тірамісу Класик",
      "description": "Багатошаровий італійський десерт з кавовим смаком і ніжним сиром маскарпоне.",
      "price": 130,
      "category": {
        "_id": "6852a508b459460cb6b47714",
        "name": "Італійські десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47720.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47721",
      "name": "Панна-Котта з Ягідним Кулі",
      "description": "Ніжний вершковий десерт з полуничним або малиновим соусом.",
      "price": 115,
      "category": {
        "_id": "6852a508b459460cb6b47714",
        "name": "Італійські десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47721.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47722",
      "name": "Сицилійські Канолі",
      "description": "Хрусткі трубочки з рікоттою та цукатами, обсмажені у фритюрі.",
      "price": 95,
      "category": {
        "_id": "6852a508b459460cb6b47714",
        "name": "Італійські десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47722.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47723",
      "name": "Афогато",
      "description": "Кулька ванільного морозива, що плаває в гарячому еспресо.",
      "price": 80,
      "category": {
        "_id": "6852a508b459460cb6b47714",
        "name": "Італійські десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47723.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47724",
      "name": "Сабайон з Марсалою",
      "description": "Легкий італійський заварний крем з вином Марсала.",
      "price": 120,
      "category": {
        "_id": "6852a508b459460cb6b47714",
        "name": "Італійські десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47724.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47725",
      "name": "Лимонний десерт Деліція",
      "description": "Ніжний бісквіт з лимонним кремом та цукровою пудрою.",
      "price": 105,
      "category": {
        "_id": "6852a508b459460cb6b47714",
        "name": "Італійські десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47725.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47726",
      "name": "Фріттоле Венеціане",
      "description": "М'які венеціанські пончики з родзинками, обсмажені у фритюрі.",
      "price": 90,
      "category": {
        "_id": "6852a508b459460cb6b47714",
        "name": "Італійські десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47726.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47727",
      "name": "Струклі з яблуками",
      "description": "Традиційний італійський рулет з яблуками та корицею.",
      "price": 140,
      "category": {
        "_id": "6852a508b459460cb6b47714",
        "name": "Італійські десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47727.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47728",
      "name": "Шоколадний фондан",
      "description": "Класичний десерт з рідким шоколадним центром.",
      "price": 120,
      "category": {
        "_id": "6852a508b459460cb6b47715",
        "name": "Гарячі десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47728.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47729",
      "name": "Яблучний Штрудель (Гарячий)",
      "description": "Теплий, хрусткий штрудель з ароматною яблучною начинкою.",
      "price": 110,
      "category": {
        "_id": "6852a508b459460cb6b47715",
        "name": "Гарячі десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47729.png"
    },
    {
      "_id": "6852a9fcb459460cb6b4772a",
      "name": "Чуррос з Шоколадним Соусом",
      "description": "Хрусткі смажені палички з тіста, подаються з теплим шоколадним соусом.",
      "price": 90,
      "category": {
        "_id": "6852a508b459460cb6b47715",
        "name": "Гарячі десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b4772a.png"
    },
    {
      "_id": "6852a9fcb459460cb6b4772b",
      "name": "Гарячий Брауні з Морозивом",
      "description": "Соковитий шоколадний пиріг, подається теплим з кулькою ванільного морозива.",
      "price": 145,
      "category": {
        "_id": "6852a508b459460cb6b47715",
        "name": "Гарячі десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b4772b.png"
    },
    {
      "_id": "6852a9fcb459460cb6b4772c",
      "name": "Банановий Спліт (Гарячий)",
      "description": "Розрізаний банан, поданий з кулькою морозива, гарячим шоколадним сиропом та горіхами.",
      "price": 130,
      "category": {
        "_id": "6852a508b459460cb6b47715",
        "name": "Гарячі десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b4772c.png"
    },
    {
      "_id": "6852a9fcb459460cb6b4772d",
      "name": "Глінтвейн (десертний)",
      "description": "Ароматний гарячий напій з червоного вина, спецій та фруктів.",
      "price": 85,
      "category": {
        "_id": "6852a508b459460cb6b47715",
        "name": "Гарячі десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b4772d.png"
    },
    {
      "_id": "6852a9fcb459460cb6b4772e",
      "name": "Гарячі Ягоди з Маскарпоне",
      "description": "Теплі лісові ягоди, подані з ніжним кремом маскарпоне.",
      "price": 100,
      "category": {
        "_id": "6852a508b459460cb6b47715",
        "name": "Гарячі десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b4772e.png"
    },
    {
      "_id": "6852a9fcb459460cb6b4772f",
      "name": "Шоколадний Пудинг (Теплий)",
      "description": "Насичений шоколадний пудинг, що подається теплим.",
      "price": 95,
      "category": {
        "_id": "6852a508b459460cb6b47715",
        "name": "Гарячі десерти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b4772f.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47730",
      "name": "Профітролі з кремом",
      "description": "Легкі заварні тістечка, наповнені ніжним кремом.",
      "price": 95,
      "category": {
        "_id": "6852a508b459460cb6b47716",
        "name": "Заварні тістечка"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47730.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47731",
      "name": "Еклери Ванільні",
      "description": "Довгі заварні тістечка з ванільним кремом.",
      "price": 85,
      "category": {
        "_id": "6852a508b459460cb6b47716",
        "name": "Заварні тістечка"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47731.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47732",
      "name": "Еклери Шоколадні",
      "description": "Довгі заварні тістечка з шоколадним кремом.",
      "price": 85,
      "category": {
        "_id": "6852a508b459460cb6b47716",
        "name": "Заварні тістечка"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47732.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47733",
      "name": "Париж-Брест",
      "description": "Заварне кільце, наповнене легким праліновим кремом.",
      "price": 110,
      "category": {
        "_id": "6852a508b459460cb6b47716",
        "name": "Заварні тістечка"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47733.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47734",
      "name": "Крокембуш (Порційний)",
      "description": "Невелика порція традиційного французького десерту з карамелізованих профітролів.",
      "price": 160,
      "category": {
        "_id": "6852a508b459460cb6b47716",
        "name": "Заварні тістечка"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47734.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47735",
      "name": "Шу",
      "description": "Круглі заварні тістечка з різноманітними начинками.",
      "price": 75,
      "category": {
        "_id": "6852a508b459460cb6b47716",
        "name": "Заварні тістечка"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47735.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47736",
      "name": "Монастирська хата",
      "description": "Традиційний торт з вишнями та сметанним кремом.",
      "price": 130,
      "category": {
        "_id": "6852a508b459460cb6b47716",
        "name": "Заварні тістечка"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47736.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47737",
      "name": "Торт Наполеон",
      "description": "Класичний багатошаровий торт з листкового тіста та крему.",
      "price": 140,
      "category": {
        "_id": "6852a508b459460cb6b47716",
        "name": "Заварні тістечка"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47737.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47738",
      "name": "Чизкейк \"Нью-Йорк\"",
      "description": "Вершковий чизкейк на пісочній основі.",
      "price": 150,
      "category": {
        "_id": "6852a508b459460cb6b47717",
        "name": "Класичні торти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47738.png"
    },
    {
      "_id": "6852a9fcb459460cb6b47739",
      "name": "Торт \"Київський\"",
      "description": "Знаменитий торт з повітряно-горіховими коржами та масляним кремом.",
      "price": 180,
      "category": {
        "_id": "6852a508b459460cb6b47717",
        "name": "Класичні торти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47739.png"
    },
    {
      "_id": "6852a9fcb459460cb6b4773a",
      "name": "Торт 'Захер'",
      "description": "Австрійський шоколадний торт з абрикосовим конфітюром.",
      "price": 160,
      "category": {
        "_id": "6852a508b459460cb6b47717",
        "name": "Класичні торти"
      },
      "image": "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b4773a.png"
    }
  ],
  "totalItems": 84,
  "page": 1,
  "limit": 27
}

export default dessertsData;
