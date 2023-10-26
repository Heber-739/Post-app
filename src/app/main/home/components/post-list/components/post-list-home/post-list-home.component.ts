import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';
import {  Post } from 'src/app/interfaces/responsePostList.interface';

@Component({
  selector: 'app-post-list-home',
  templateUrl: './post-list-home.component.html',
  styleUrls: ['./post-list-home.component.css']
})
export class PostListHomeComponent implements OnInit {
  public titles:string[]=['id','description','Actions'];
  newPost:boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public dataSource!:MatTableDataSource<Post>;

  private subscriptions:Subscription[]=[]

  constructor(
    private router:Router,
    private postService: PostService) {}

  ngOnInit(): void {
   this.getPosts()
  }

  private getPosts():void{
    const posts = this.getPaginatorData();
    this.dataSource = new MatTableDataSource<Post>(posts),
    this.dataSource!.paginator = this.paginator
  }

  goPostDetail(postId:number):void{
    this.router.navigate([`/home/posts/post/${postId}`])
  }


  getPaginatorData():Post[]{
    return  [
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Lionel Messi habló por primera vez luego del Mundial Qatar 2022 y reveló cómo vivió el último penal",
        "description": "Lionel Messi rompió el silencio por primera vez después de haber ganado la Copa del Mundo y habló de cómo vivió Qatar. Desde la derrota contra Arabia Saudita, las peleas en el partido contra Holanda y hasta los pensamientos que se le cruzaron por la mente en el último penal pateado por Gonzalo Montiel. ",
        "state": true,
        "creationDate": new Date("2023-01-31T00:27:09.621Z"),
        "modificationDate": new Date("2023-01-31T00:27:09.621Z"),
        "id": "63d8605d22add7c12eceb8e1"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Se cumplen 60 días del fracaso de la Selección de México en Qatar 2022",
        "description": "En los próximos 60 días se hará un trabajo de análisis a profundidad del área deportiva y se harán cambios estructurales, como la cantidad de extranjeros, descenso y ascenso, además de la multipropiedad”, fueron las palabras de Yon de Luisa el 1 de diciembre de 2022, el día siguiente a la eliminación del Tricolor en el Mundial de Qatar. https://www.mediotiempo.com/futbol/seleccion-mayor/cumplen-60-fracaso-seleccion-mexicana-qatar-2022",
        "state": true,
        "creationDate": new Date("2023-01-31T00:28:35.979Z"),
        "modificationDate": new Date("2023-01-31T00:28:35.979Z"),
        "id": "63d860b322add7c12eceb8e3"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Vóley: Estudiantes se hizo fuerte de local",
        "description": "En el inicio de la segunda fecha de la Liga Argentina Femenina, Estudiantes hizo de local en el Polideportivo de Uno y superó con autoridad a la Universidad Nacional de La Matanza, que hizo su debut tras cumplir la fecha libre en el primer weekend. El resultado final fue 3 sets a 0, con parciales de 25-11, 25-19 y 25-16.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:29:58.457Z"),
        "modificationDate": new Date("2023-01-31T00:29:58.457Z"),
        "id": "63d8610622add7c12eceb8e7"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "World Padel Tour celebra 10 años de pasión",
        "description": "El Corazón Azul está de Aniversario. 2023 marca el décimo aniversario de World Padel Tour, el circuito profesional de pádel más grande del mundo y, para celebrarlo, estrenamos nueva identidad. El 10 se cuela en nuestro logo para celebrar nuestra historia: diez años de pasión, de competición y de esfuerzo de los mejores jugadores y jugadoras del mundo. Y diez años de comunión con la mejor afición del mundo, la de World Padel Tour, que ha llenado estadios y batido récords de audiencia para seguir a sus ídolos en el 20x10 de World Padel Tour.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:30:52.156Z"),
        "modificationDate": new Date("2023-01-31T00:30:52.156Z"),
        "id": "63d8613c22add7c12eceb8e9"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Cepero y Ayats, la unión de la experiencia y la juventud",
        "description": "El baile de parejas en el mejor pádel del mundo nos deja una nueva unión sobre el 20x10. Álvaro Cepero y Arnau Ayats compartirán lado de la pista de cara a la temporada 2023 de World Padel Tour. La nueva pareja española se mostraba muy ilusionada por este nuevo proyecto y afirmaba que darán 'el 100% para poder conseguir grandes resultados'.Esta nueva dupla contará con experiencia y juventud a partes iguales, y el sacrificio y lucha estarán garantizados sobre la pista. Además, se trata de una de las nuevas duplas con mayor potencial que tratará de dar la sorpresa esta campaña.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:31:49.670Z"),
        "modificationDate": new Date("2023-01-31T00:31:49.670Z"),
        "id": "63d8617522add7c12eceb8eb"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Agónico triunfo de Salta Basket en Tucumán",
        "description": "Con una bomba de tres sobre la chicharra, en manos del base chaqueño Agustín Jara, Salta Basket empató el partido en 85 ante Tucumán Básquet. En el suplementario, el combinado salteño hizo la diferencia ganadora y se quedó con una victoria de antología.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:32:43.274Z"),
        "modificationDate": new Date("2023-01-31T00:32:43.274Z"),
        "id": "63d861ab22add7c12eceb8ed"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "El Unicaja vence al Valencia Basket (102-86)",
        "description": "El Unicaja ganó como local al Valencia Basket por 102-86 en la decimoctava jornada de la Liga ACB. Anteriormente, los jugadores del Unicaja consiguieron ganar a domicilio contra el BAXI Manresa por 94-98 y tras este partido suman un total de cuatro triunfos en los últimos cinco partidos. Por su parte, los del Valencia Basket también ganaron en casa al Casademont Zaragoza por 88-76. Con este resultado, el Unicaja se sitúa en quinto puesto y acumula hasta el momento 13 victorias en 18 partidos disputados, mientras que el Valencia Basket se queda en novena posición con nueve victorias en 18 partidos jugados.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:33:08.799Z"),
        "modificationDate": new Date("2023-01-31T00:33:08.799Z"),
        "id": "63d861c422add7c12eceb8ef"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Primera Fecha, la figura fue Oscar Romero y le dio el triunfo a Boca frente a Atlético Tucumán",
        "description": "El Xeneize estrenó su título de campeón con victoria frente al Decano. El ex arquero de la Selección arrancó con dudas pero en el segundo tiempo tuvo una tapada clave. ¿El paraguayo? Figura y goleador. Cuando Boca se estancaba en las mismas falencias del 2022, Oscar Romero asumió el protagonismo en la noche del retorno del equipo de Hugo Ibarra y construyó el triunfo por 1-0 ante Atlético Tucumán. El zurdo puso el pié derecho y convirtió el único gol de la noche. Y así le sacó una sonrisa a los de la ribera después de la derrota en la final de la Supercopa Internacional ante Racing. Con lo justo, y con la presentación de Sergio Romero en el arco, Boca ganó para sacarse el mal sabor que le había quedado tras el viaje a Abu Dhabi.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:35:18.625Z"),
        "modificationDate": new Date("2023-01-31T00:35:18.625Z"),
        "id": "63d8624622add7c12eceb8f1"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "River venció a Central Córdoba en el debut oficial de Demichelis",
        "description": "Nacho Fernández abrió el marcador para River River Plate inició oficialmente la era post Marcelo Gallardo, comandada por otro hijo de la casa como Martín Demichelis, con un triunfo 2 a 0 ante Central Córdoba de Santiago del Estero, en uno de los partidos más relevantes de la primera fecha de la Liga Profesional de Fútbol (LPF).",
        "state": true,
        "creationDate": new Date("2023-01-31T00:36:27.778Z"),
        "modificationDate": new Date("2023-01-31T00:36:27.778Z"),
        "id": "63d8628b22add7c12eceb8f5"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "¿Qué hace un desarrollador front end?",
        "description": "La Industria del Software o lo que conocemos como el sector de IT es la actividad que más empleo generó en Argentina, con 18.541 nuevos puestos de trabajo entre 2019 y 2021, según los datos de la Cámara de la Industria Argentina del Software (CESSI). Esto ha posicionado a la actividad como una de las que más peso tiene dentro de las decisiones oficiales, con lo cual el Gobierno redobla la apuesta con programas de formación e incentivos específicos para estas actividades.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:37:48.422Z"),
        "modificationDate": new Date("2023-01-31T00:37:48.422Z"),
        "id": "63d862dc22add7c12eceb8f7"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "AySA celebró los 20 años del Premio Junior del Agua",
        "description": "La empresa Agua y Saneamientos Argentinos entregó el premio al proyecto 'FlocuNat'. Propone la potabilización del agua de río mediante el tratamiento con las semillas del árbol 'Moringa oleífera Lam', que actúan como un floculante natural.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:39:10.513Z"),
        "modificationDate": new Date("2023-01-31T00:39:10.513Z"),
        "id": "63d8632e22add7c12eceb8f9"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Alumnos de la Técnica 1 de Ituzaingó premiados por un proyecto de potabilización de agua con semillas de Moringa",
        "description": "Alumnos de 7° Química de la Escuela Secundaria Técnica N°1 de Ituzaingó obtuvieron el premio a la Mejor defensa por su proyecto de potabilización de agua en la Expo UIO-Tec. La jornada se realizó el viernes pasado en la Cantábrica, sede de la Unión Industrial del Oeste, cuyo fin es incentivar a los colegios técnicos de Ituzaingó, Morón y Hurlingham a desarrollar proyectos de ciencias técnicas. Emanuel Flores, Emiliano Morel y Lautaro Profita fueron los alumnos que representaron a 7° Química del Colegio “República del Paraguay”, aunque Esther Voiro, su profesora, comentó que fue todo el curso el que trabajó durante el año. Ella misma contó que para organizarlos dividió a los adolescentes en grupos y les dio a cada uno una actividad específica. Algunos se encargaron de buscar información sobre ensayos físicos y quimicos; otros sobre ensayos ecotoxicológicos, otros, tratamiento de las semillas, detalla con sus propias palabras. Una alumna registraba en fotos las actividades prácticas, otra realizaba el informe, otros asistían fuera de horario escolar para completar las prácticas más extensas continúa explicando la profesora sobre el trabajo hecho en equipo.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:44:38.899Z"),
        "modificationDate": new Date("2023-01-31T00:44:38.899Z"),
        "id": "63d86476cfef5d6b3fefe2b7"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "9z y otra victoria épica: aseguró su lugar en el Mundial de Counter Strike de Río de Janeiro",
        "description": "9z Team, la organización argentina de esports creada por Francisco “Frankkaster” Postiglione, volvió a marcar a fuego la escena de deportes electrónicos de Argentina con el videojuego Counter Strike. El equipo violeta se aseguró este viernes su pasaje al Intel Extreme Masters (IEM) de Río de Janeiro que llegará por primera vez a Sudamérica al cabo de 16 ediciones. El equipo argentino se impuso por 16-2 y 16-7 sobre el conjunto sudafricano ATK y selló así su tercer triunfo en el American RMR de Estocolmo, Suecia, logro que le permitió hacerse con un pasaje para un Major por segunda vez consecutiva.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:57:37.951Z"),
        "modificationDate": new Date("2023-01-31T00:57:37.951Z"),
        "id": "63d86781cfef5d6b3fefe2bb"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "LEC Jornada 6: KOI se va con las manos vacías",
        "description": "Fin de la segunda semana de la League of Legends EMEA Championship (LEC) tras una jornada 6 sorprendente. La sexta jornada nos dejó partidos con resultados inesperados y un único líder en la tabla de posiciones. Team Vitality será el único líder de la LEC, al menos hasta la próxima semana. Mientras que EXCEL se convierte en el nuevo colista tras perder el duelo ante un Astralis que suma su primera victoria. En otras noticias, tenemos una tabla media y un segundo puesto muy apretado, con grandes nombres y algunas sorpresas peleando en las posiciones más altas. Mientras que las malas noticias abordan a KOI, quién se va con un 0-3 y sensaciones muy amargas a la última semana.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:58:32.217Z"),
        "modificationDate": new Date("2023-01-31T00:58:32.217Z"),
        "id": "63d867b8cfef5d6b3fefe2bf"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Valorant: Un rosa más intenso, estos son los miembros de KRU que jugarán en Lock-In Brasil",
        "description": "Con la emoción del primer evento del año dentro del mundo competitivo de Valorant, las escuadras se potenciaron con el mercado de fichaje donde los movimientos estuvieron muy interesantes, KRU Esports mostró grandes cambios para esta nueva etapa de su historia donde buscará volver a los primeros puestos en este nuevo desafío que es llamado Liga Americas donde solo los mejores compiten en este ámbito pero te presentamos a los miembros de esta escuadra.",
        "state": true,
        "creationDate": new Date("2023-01-31T00:59:44.267Z"),
        "modificationDate": new Date("2023-01-31T00:59:44.267Z"),
        "id": "63d86800cfef5d6b3fefe2c3"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "KRÜ Esports FEM se consagran campeonas regionales de Valorant",
        "description": "Tras una temporada que duró más de cuatro meses, Latinoamérica por fin conoció a los dos equipos femeninos que van a representar a la región Norte y Sur en la final regional de Valorant Game Changers, KRÜ Esports y FiRePOWER buscarán el pase al mundial del shooter de Riot que se celebrará en Berlín, Alemania en noviembre de este mismo año. El recorrido de KRÜ Fem para llegar a la final comenzó después de haberse clasificado a la final del Upper Bracket, donde se enfrentaron a NOORG y a quienes vencieron por 2-1 en un formato que era Bo3. Con un recorrido perfecto, habiéndose permanecido invictas en todos los torneos oficiales de la VCT, las jugadoras del Rosado lograron clasificarse a la última instancia de nuestra región. La gran final se dio entre los clubes con más hinchada del país, el enfrentamiento para decidir quién iría a representar a la región Sur a la Ciudad de México tuvo como protagonistas a las jugadoras de KRÜ Esports y de 9z Team.",
        "state": true,
        "creationDate": new Date("2023-01-31T01:00:31.218Z"),
        "modificationDate": new Date("2023-01-31T01:00:31.218Z"),
        "id": "63d8682fcfef5d6b3fefe2c5"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "¿Messi y el Kun vuelven a jugar juntos? El equipo de Agüero en la Kings League quiere reunirlos en el 'último baile'",
        "description": "Los amantes del fútbol se quedaron con la espina de ver a Sergio Kun Agüero y a Lionel Messi, íntimos amigos fuera de lo deportivo, jugando juntos en un club. Y estuvieron cerca. En mayo del 2021, el delantero que dejó una notable huella en su larga estadía en el Manchester City de Inglaterra, firmó contrato con el Barcelona para vestirse con la camiseta Blaugrana y poder tirar paredes juntos. Pero, finalmente, tres meses más tarde de la firma, Messi emigró a su actual club París Saint-Germaín y terminó con todas las probabilidades de que esto sucediera. Para colmo, unos meses más tarde, el Kun sufrió su problema cardíacos y debió abandonar la práctica profesional.",
        "state": true,
        "creationDate": new Date("2023-01-31T01:03:02.219Z"),
        "modificationDate": new Date("2023-01-31T01:03:02.219Z"),
        "id": "63d868c6cfef5d6b3fefe2c7"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "El 'megacohete' SLS está superando las expectativas de la NASA. Son buenas noticias para el futuro de Artemis",
        "description": "Un pequeño paso para el Space Launch System (SLS), pero un gran paso para la exploración espacial y el objetivo de que podamos volver a pisar la Luna. La NASA está comprobando que el cohete SLS, apodado como “Mega Moon Rocket”, superó su primera prueba con éxito con el despegue de la misión Artemis I, a mediados de noviembre. Y los resultados invitan al optimismo. Son buenas noticias para el SLS, pero sobre todo para el programa Artemis, el ambicioso proyecto de exploración espacial que aspira a llevar a un humano de vuelta a la Luna e incluso, yendo más allá, establecer una presencia sostenible en la superficie y órbita del satélite.",
        "state": true,
        "creationDate": new Date("2023-01-31T01:04:26.691Z"),
        "modificationDate": new Date("2023-01-31T01:04:26.691Z"),
        "id": "63d8691acfef5d6b3fefe2cb"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Cómo es el Proyecto Olimpo que la NASA financia para hacer construcciones en la Luna",
        "description": "La Agencia Espacial Estadounidense otorgó a una empresa privada 57 millones de dólares para desarrollar tecnologías que permitirá a la humanidad construir puestos de avanzada en la Luna y Marte, utilizando tierra y rocas disponibles en el lugar. Sin dudas estamos viendo una nueva era espacial, con un 2022 lleno de misiones espaciales, nuevos robots, naves espaciales, cohetes y satélites que buscan continuar el espíritu exploratorio humano.",
        "state": true,
        "creationDate": new Date("2023-01-31T01:05:34.055Z"),
        "modificationDate": new Date("2023-01-31T01:05:34.055Z"),
        "id": "63d8695ecfef5d6b3fefe2cd"
      },
      {
        "author": {
          "name": "Federico Morel",
          "userId": "63cbfad3216a4f392991bb12",
          "role": "user"
        },
        "title": "Sonda Juno de la NASA pierde cientos de imágenes de Júpiter en su último sobrevuelo",
        "description": "La cámara JunoCam de la nave espacial Juno de la NASA no captó la mayoría de las imágenes previstas durante el último sobrevuelo de Júpiter el 22 de enero. Los datos recibidos de la nave indican que la cámara experimentó un problema similar al que se produjo en su anterior paso cercano al gigante gaseoso el mes pasado, cuando el equipo observó un aumento anómalo de la temperatura tras encender la cámara para preparar el sobrevuelo. Sin embargo, en esta nueva ocasión, el problema persistió durante más tiempo (23 horas frente a los 36 minutos del paso cercano de diciembre), dejando inutilizables las primeras 214 imágenes de JunoCam previstas para el sobrevuelo. Al igual que en el caso anterior, una vez que desapareció la anomalía que provocó el aumento de temperatura, la cámara volvió a funcionar con normalidad y las 44 imágenes restantes fueron de buena calidad y utilizables.",
        "state": true,
        "creationDate": new Date("2023-01-31T01:06:20.464Z"),
        "modificationDate": new Date("2023-01-31T01:06:20.464Z"),
        "id": "63d8698ccfef5d6b3fefe2cf"
      }
    ]
  }
}
