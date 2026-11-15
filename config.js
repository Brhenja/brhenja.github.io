/* Configuración del sitio. La edita Velin Admin; también podés editarla a mano (es JSON dentro de window.SITE). */
window.SITE = {
  "meta": {
    "lang": "es",
    "title": "Brhenja",
    "description": "Página personal de Brhenja: Velin, videos, novedades y contacto.",
    "url": "https://brhenja.github.io/",
    "image": "https://brhenja.github.io/icon.png",
    "icon": "icon.png",
    "ogTitle": "Brhenja",
    "twitterCard": "summary"
  },
  "brand": "Brhenja",
  "audio": {
    "music": "audio/bgmusic.mp3",
    "click": "audio/click.wav",
    "musicVolume": 0.28,
    "clickVolume": 0.5,
    "toggles": true
  },
  "release": {
    "enabled": true,
    "repo": "Brhenja/Velin",
    "cacheMinutes": 60,
    "locale": "es-AR",
    "liveLabel": "Última versión {ver}",
    "fallbackVer": "v1.1.1",
    "fallbackDate": "Windows 10 u 11 de 64 bits",
    "assets": {
      "exe": "\\.exe$",
      "zip": "portable.*\\.zip$"
    }
  },
  "footer": [
    {
      "label": "brhenja.github.io"
    }
  ],
  "aliases": {
    "descargas": "velin/inicio",
    "review": "velin/galeria",
    "funciones": "velin/funciones",
    "preguntas": "velin/preguntas",
    "galeria": "velin/galeria"
  },
  "cats": [
    {
      "id": "proyectos",
      "label": "Proyectos",
      "type": "grid",
      "items": [
        {
          "name": "Velin",
          "glyph": "V",
          "icon": "icon.png",
          "live": true,
          "kind": "Launcher de Minecraft",
          "year": "Última versión v1.1.1",
          "desc": "Launcher de Minecraft Java para Windows: liviano, con muy bajo consumo de recursos y muchas funciones útiles. Instancias, mods, mundos y más.",
          "tags": [
            "Minecraft",
            "Windows",
            "Código abierto"
          ],
          "links": [
            {
              "label": "Ver página",
              "url": "#velin"
            },
            {
              "label": "Descargar",
              "url": "https://github.com/Brhenja/Velin/releases/latest",
              "dl": "exe"
            },
            {
              "label": "Código",
              "url": "https://github.com/Brhenja/Velin"
            }
          ],
          "art": {
            "a": 30,
            "b": 22,
            "motif": "lozenge",
            "seed": 11
          }
        },
        {
          "name": "Mi GitHub",
          "glyph": "GH",
          "icon": "github.png",
          "iconRound": true,
          "kind": "Perfil",
          "year": "Brhenja",
          "desc": "Todos mis repositorios y proyectos, con el código fuente abierto.",
          "tags": [
            "Código abierto"
          ],
          "links": [
            {
              "label": "Abrir perfil",
              "url": "https://github.com/Brhenja"
            }
          ],
          "art": {
            "a": 36,
            "b": 24,
            "motif": "checker",
            "seed": 37
          }
        }
      ]
    },
    {
      "id": "velin",
      "label": "Velin",
      "type": "section",
      "brand": "Velin",
      "title": "Velin — Launcher de Minecraft by Brhenja",
      "backLabel": "← Brhenja",
      "cats": [
        {
          "id": "inicio",
          "label": "Inicio",
          "type": "page",
          "wide": true,
          "blocks": [
            {
              "type": "hero",
              "icon": "icon.png",
              "title": "Velin",
              "subtitle": "By Brhenja"
            },
            {
              "type": "p",
              "text": "Un launcher de Minecraft Java para Windows con soporte para cuentas de Minecraft premium: liviano, con muy bajo consumo de recursos y muchas funciones útiles."
            },
            {
              "type": "p",
              "text": "Cada instancia tiene su propia carpeta, Java se descarga solo, funciona con Fabric, Forge, Quilt y NeoForge, y podés buscar mods, modpacks, resource packs y shaders de Modrinth y CurseForge sin salir del launcher."
            },
            {
              "type": "h2",
              "text": "Descargas"
            },
            {
              "type": "buttons",
              "items": [
                {
                  "label": "Instalador (.exe)",
                  "url": "https://github.com/Brhenja/Velin/releases/download/v1.0.0/VelinSetup-1.0.0.exe",
                  "dl": "exe"
                },
                {
                  "label": "Versión portable (.zip)",
                  "url": "https://github.com/Brhenja/Velin/releases/download/v1.0.0/Velin-1.0.0-portable-win-x64.zip",
                  "dl": "zip"
                }
              ]
            },
            {
              "type": "p",
              "style": "ver",
              "text": "Última versión: **{ver}** · {date}"
            },
            {
              "type": "p",
              "style": "note",
              "text": "Para Windows 10 u 11 de 64 bits. El instalador no está firmado, así que Windows puede mostrar un aviso: elegí «Más información» y después «Ejecutar de todas formas»."
            },
            {
              "type": "p",
              "style": "note",
              "text": "Velin no es un producto oficial de Minecraft ni está afiliado a Mojang o Microsoft."
            }
          ]
        },
        {
          "id": "funciones",
          "label": "Funciones",
          "type": "page",
          "wide": true,
          "blocks": [
            {
              "type": "h1",
              "text": "Funciones"
            },
            {
              "type": "features",
              "columns": [
                {
                  "title": "Instancias",
                  "items": [
                    "Cada una con su propia carpeta: crear, duplicar, renombrar y eliminar",
                    "Exportar e importar: .zip de Velin, .mrpack de Modrinth y .zip de CurseForge",
                    "Grupos con filtro, orden por nombre, última vez jugada o tiempo jugado",
                    "Cambiar la versión o el loader conservando mundos, mods y configuración",
                    "Instancias con .jar propio"
                  ]
                },
                {
                  "title": "Loaders",
                  "items": [
                    "Vanilla, Fabric, Forge, Quilt y NeoForge",
                    "La lista solo muestra versiones compatibles y elige por defecto la estable más nueva"
                  ]
                },
                {
                  "title": "Java y lanzamiento",
                  "items": [
                    "Java Temurin descargado automáticamente según la versión de Minecraft",
                    "Detección de otros Java instalados y Java propio por instancia",
                    "Flags de JVM tipo Aikar y RAM fija por instancia",
                    "Ventana o pantalla completa, entrar directo a un servidor o mundo y argumentos extra",
                    "Descargas verificadas (SHA1 y tamaño) y reintentos",
                    "Consola en vivo y log de lanzamiento"
                  ]
                },
                {
                  "title": "Contenido",
                  "items": [
                    "Mods, modpacks, resource packs, shaders y datapacks desde Modrinth y CurseForge",
                    "Instalación automática de las dependencias obligatorias de los mods",
                    "Activar, desactivar, quitar y actualizar mods",
                    "Mundos: backup, duplicar, eliminar, exportar e importar",
                    "Copias de seguridad automáticas (opcionales) con restauración",
                    "Servidores con estado en vivo y capturas de pantalla con miniaturas",
                    "Vault: explorador de archivos propio con extracción de .zip, .7z y .rar"
                  ]
                },
                {
                  "title": "Interfaz",
                  "items": [
                    "Ventana propia sin bordes de Windows",
                    "Temas personalizables en .json (Velin medieval y Flash)",
                    "Español e inglés",
                    "Música de fondo con interruptor, sonido de click y pantalla de inicio opcional",
                    "Proxy opcional"
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "galeria",
          "label": "Galería",
          "type": "grid",
          "wide": true,
          "items": [
            {
              "name": "Pantalla principal",
              "glyph": "I",
              "img": "assets/captura-principal.png",
              "kind": "Captura",
              "desc": "La pantalla principal de Velin con la lista de instancias y los botones.",
              "tags": [
                "Instancias"
              ],
              "links": [
                {
                  "label": "Ver en grande",
                  "url": "assets/captura-principal.png"
                }
              ],
              "art": {
                "a": 28,
                "b": 20,
                "motif": "rings",
                "seed": 201
              }
            },
            {
              "name": "Mods y contenido",
              "glyph": "II",
              "img": "assets/captura-mods.png",
              "kind": "Captura",
              "desc": "El buscador de mods de Modrinth dentro de Velin.",
              "tags": [
                "Modrinth",
                "Mods"
              ],
              "links": [
                {
                  "label": "Ver en grande",
                  "url": "assets/captura-mods.png"
                }
              ],
              "art": {
                "a": 22,
                "b": 36,
                "motif": "lozenge",
                "seed": 203
              }
            },
            {
              "name": "Configuración",
              "glyph": "III",
              "img": "assets/captura-configuracion.png",
              "kind": "Captura",
              "desc": "La ventana de configuración de Velin.",
              "tags": [
                "Ajustes"
              ],
              "links": [
                {
                  "label": "Ver en grande",
                  "url": "assets/captura-configuracion.png"
                }
              ],
              "art": {
                "a": 34,
                "b": 18,
                "motif": "stripes",
                "seed": 207
              }
            },
            {
              "name": "Review del launcher",
              "glyph": "▶",
              "keepGlyph": true,
              "img": "https://i.ytimg.com/vi/Q0_SXW16naQ/maxresdefault.jpg",
              "imgFallback": "https://i.ytimg.com/vi/Q0_SXW16naQ/mqdefault.jpg",
              "kind": "Video",
              "year": "YouTube",
              "desc": "Una review de Velin en video.",
              "tags": [
                "Review"
              ],
              "links": [
                {
                  "label": "Ver en YouTube",
                  "url": "https://www.youtube.com/watch?v=Q0_SXW16naQ"
                }
              ],
              "art": {
                "a": 18,
                "b": 38,
                "motif": "checker",
                "seed": 209
              }
            }
          ]
        },
        {
          "id": "preguntas",
          "label": "Preguntas",
          "type": "page",
          "wide": true,
          "blocks": [
            {
              "type": "h1",
              "text": "Preguntas frecuentes"
            },
            {
              "type": "faq",
              "items": [
                {
                  "q": "¿Por qué me da error al intentar agregar una cuenta de Microsoft?",
                  "a": "Puede deberse a varias razones. Envíame un mensaje desde **Contacto** con el error que tengas y trataré de ayudarte."
                },
                {
                  "q": "¿Es seguro?",
                  "a": "Velin es de código abierto y puedes consultar su [código fuente](https://github.com/Brhenja/Velin). Descárgalo desde sus fuentes oficiales."
                },
                {
                  "q": "¿Por qué CurseForge no me funciona?",
                  "a": "Para que CurseForge funcione, tienes que agregar tu API en Configuración, en el apartado que dice \"API de CurseForge\"."
                },
                {
                  "q": "Velin no me inicia, ¿por qué?",
                  "a": "Puede deberse a varias razones. Envíame un mensaje desde **Contacto** con el error que tengas y trataré de ayudarte."
                }
              ]
            }
          ]
        },
        {
          "id": "novedades",
          "label": "Novedades",
          "type": "page",
          "blocks": [
            {
              "type": "h1",
              "text": "Novedades"
            },
            {
              "type": "news",
              "only": "velin"
            }
          ]
        },
        {
          "id": "contacto",
          "label": "Contacto",
          "type": "page",
          "blocks": [
            {
              "type": "h1",
              "text": "Dudas y errores"
            },
            {
              "type": "rows",
              "rows": [
                {
                  "label": "Discord",
                  "value": "brhenja.",
                  "copy": "brhenja."
                },
                {
                  "label": "Gmail",
                  "value": "brhenja@gmail.com",
                  "url": "mailto:brhenja@gmail.com",
                  "copy": "brhenja@gmail.com"
                },
                {
                  "label": "Código",
                  "value": "github.com/Brhenja/Velin",
                  "url": "https://github.com/Brhenja/Velin",
                  "whole": true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "videos",
      "label": "Videos",
      "type": "grid",
      "wide": true,
      "items": [
        {
          "name": "Review de Velin",
          "glyph": "▶",
          "keepGlyph": true,
          "img": "https://i.ytimg.com/vi/Q0_SXW16naQ/maxresdefault.jpg",
          "imgFallback": "https://i.ytimg.com/vi/Q0_SXW16naQ/mqdefault.jpg",
          "kind": "Video",
          "year": "YouTube",
          "desc": "Mi primer video: una review de Velin. Más adelante voy a subir una mejor.",
          "tags": [
            "Velin",
            "Review"
          ],
          "links": [
            {
              "label": "Ver en YouTube",
              "url": "https://www.youtube.com/watch?v=Q0_SXW16naQ"
            }
          ],
          "art": {
            "a": 18,
            "b": 38,
            "motif": "stripes",
            "seed": 23
          }
        }
      ]
    },
    {
      "id": "novedades",
      "label": "Novedades",
      "type": "page",
      "blocks": [
        {
          "type": "h1",
          "text": "Novedades"
        },
        {
          "type": "news"
        }
      ]
    },
    {
      "id": "sobre-mi",
      "label": "Sobre mí",
      "type": "page",
      "blocks": [
        {
          "type": "h1",
          "text": "Sobre mí"
        },
        {
          "type": "p",
          "text": "Soy Brhenja, suelo hacer proyectos relacionados con Minecraft y en general me gusta la optimización. También me gusta hacer videos, aunque actualmente solo tengo uno subido y es medio croto. Después voy a subir una review mejor de Velin."
        },
        {
          "type": "p",
          "text": "Mi proyecto más reciente es Velin, un launcher de Minecraft ligero. Ya soporta cuentas premium y ahora estoy empezando a hacer un mod de optimización para Minecraft Java."
        },
        {
          "type": "h2",
          "text": "Ahora"
        },
        {
          "type": "defs",
          "items": [
            {
              "term": "Proyecto actual",
              "text": "Velin, [brhenja.github.io/Velin](https://brhenja.github.io/Velin)"
            },
            {
              "term": "Plataforma",
              "text": "Windows 10 u 11 de 64 bits"
            },
            {
              "term": "Idiomas",
              "text": "Español e inglés"
            },
            {
              "term": "Próximamente",
              "text": "Actualizaciones de Velin y un mod de optimización"
            }
          ]
        }
      ]
    },
    {
      "id": "contacto",
      "label": "Contacto",
      "type": "page",
      "blocks": [
        {
          "type": "h1",
          "text": "Contacto"
        },
        {
          "type": "rows",
          "rows": [
            {
              "label": "Discord",
              "value": "brhenja.",
              "copy": "brhenja."
            },
            {
              "label": "Gmail",
              "value": "brhenja@gmail.com",
              "url": "mailto:brhenja@gmail.com",
              "copy": "brhenja@gmail.com"
            },
            {
              "label": "GitHub",
              "value": "github.com/Brhenja",
              "url": "https://github.com/Brhenja",
              "whole": true
            }
          ]
        }
      ]
    }
  ],
  "news": [
    {
      "when": "En curso",
      "title": "Mod de optimización para Minecraft Java",
      "text": "Estoy empezando a hacerlo. Cuando tenga algo para probar lo publico acá."
    },
    {
      "when": "Próximamente",
      "title": "Una review mejor de Velin",
      "text": "Voy a subir un video nuevo para reemplazar al primero."
    },
    {
      "when": "4 nov 2026",
      "title": "Velin 1.1.1",
      "text": "Arregla bugs y agrega nuevas mini funciones: paginación, íconos en los detalles de los mods y un gestor de skins.",
      "velin": true
    },
    {
      "when": "3 nov 2026",
      "title": "Velin 1.1.0",
      "text": "Velin ya soporta cuentas premium con el login de Microsoft. También suma detalles de mods, mejoras en la configuración, el tema B&W y soporte para GraalVM y Semeru.",
      "velin": true
    },
    {
      "when": "21 oct 2026",
      "title": "Velin 1.0.0",
      "text": "Primera versión: instancias, loaders (Fabric, Forge, Quilt y NeoForge), Java automático, mods y modpacks de Modrinth y CurseForge, mundos, servidores y temas.",
      "velin": true
    },
    {
      "when": "Publicado",
      "title": "Mi primer video",
      "text": "Una review de Velin, hecha sin muchas vueltas."
    }
  ]
};
