This is a folder to run mysql with docker 

Build mysql image database from remote

```shell
docker compose up -d
```

Connect with mysql workbench
```
MYSQL_ROOT_PASSWORD: Admin@123
MYSQL_DATABASE: coolmatedb
MYSQL_USER: user
MYSQL_PASSWORD: password
```

Chạy lệnh sau để tạo lại database
```
create DATABASE coolmatedb;
ALTER DATABASE coolmatedb CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
```

