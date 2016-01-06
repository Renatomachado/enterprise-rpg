# -*- mode: ruby -*-
# vi: set ft=ruby :


Vagrant.configure(2) do |config|
  
  #box
  config.vm.box = "ubuntu/trusty64"

  #fowarded ports
  config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network "forwarded_port", guest: 8080, host: 8080
  config.vm.network "forwarded_port", guest: 9000, host: 9000

  #shared folders
  # config.vm.synced_folder "../data", "/vagrant_data"

  config.vm.provider "virtualbox" do |vb|
    #1,5GB is what node js uses by default
    vb.memory = "1536"
  end
  
  # Provision
  config.vm.provision "shell", privileged: false, inline: <<-SHELL
    
    #base
    sudo apt-get install curl -y
    sudo apt-get install build-essentials -y

    #git
    sudo apt-get install git git-core -y

    #nvm
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
    . ~/.nvm/nvm.sh
    nvm install 5.1
    nvm alias default 5.1
    nvm use default
    echo "nvm use default" >> ~/.profile

    #mongo
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org
    sudo service mongod stop

    sudo mkdir -p /data/db
   
    sudo sed -i -e 's/bindIp:.*/bindIp: 0.0.0.0/g' /etc/mongod.conf
    sudo sed -i -e 's#dbPath:.*#dbPath: /data/db#g' /etc/mongod.conf

    sudo chown `id -u` /data/db
    sudo service mongod start

  SHELL
end
