# Prueba de Ingreso

Este el progreso que realize a lo largo de un día de trabajo en lo conserniente al Back-End.
Por cuestiones practicas no me añadi al archivo .gitignore el archivo .env. Ni utilize una contraseña para levantar la base de datos de MySQL.

# Problemas

El inicio de sesión esta fallando (permite el pase de usuarios aun si la contraseña es incorrecta del mismo modo lo contrario también es verdad según se use: compare o compareSync), sospecho que debido a la falta de funciones async-await causada por las queries de caracter local de MySQLJS.
Lamentablemente el tiempo se acabó.
