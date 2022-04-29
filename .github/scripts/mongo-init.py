from os import system

container_id = system('docker ps -q')
print(container_id)
