# Plants API

## MongoDB

### MacOS

Just use brew

### Linux Ubuntu

[install](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

```
sudo service mongod start
sudo service mongod status
```

#### Issues

```
● mongod.service - MongoDB Database Server
   Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
   Active: failed (Result: exit-code) since Mon 2020-04-20 13:32:29 IST; 6min ago
     Docs: https://docs.mongodb.org/manual
  Process: 27917 ExecStart=/usr/bin/mongod --config /etc/mongod.conf (code=exited, status=14)
 Main PID: 27917 (code=exited, status=14)

Apr 20 13:32:29 manojkumar systemd[1]: Started MongoDB Database Server.
Apr 20 13:32:29 manojkumar systemd[1]: mongod.service: Main process exited, code=exited, status=14/n/a
Apr 20 13:32:29 manojkumar systemd[1]: mongod.service: Failed with result 'exit-code'.
```

```
chown -R mongodb:mongodb /var/lib/mongodb
chown mongodb:mongodb /tmp/mongodb-27017.sock
```
