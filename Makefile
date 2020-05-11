libDb=lib-db
libServer=lib-server

run:
	(cd docker && docker-compose up) 

down:
	(cd docker && docker-compose down) 

clean-img:
	docker image rm -f $(libServer) 
	docker image rm -f $(libDb)

db-seed:
	docker cp seed.db $(libDb):/seed.js
	docker exec -it $(libDb) mongo mongodb://localhost:27017/Library /seed.js

.PHONY: client
client:
	(cd ./client && npm run start)