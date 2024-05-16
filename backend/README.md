Run this before 

```sql 
create DATABASE coolmatedb;
ALTER DATABASE coolmatedb CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- ALTER TABLE product CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Seed data to database move to backend folder 


docker compose
```yml
mysql:
 image: mysql:latest
 command: ['mysqld', '--character-set-server=utf8mb4', '--collation-server=utf8mb4_unicode_ci']
 environment:
    MYSQL_ROOT_PASSWORD: your_root_password
    MYSQL_DATABASE: your_database
    MYSQL_USER: your_user
    MYSQL_PASSWORD: your_password
```

## Setup ngrok 
```bash
ngrok http --domain=emerging-lark-amazingly.ngrok-free.app 8080
```