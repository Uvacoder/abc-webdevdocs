---
title: "Ansible"
description: "Ansible main concepts and reference"
---

## Installation on Ubuntu

```
sudo apt update
sudo apt install software-properties-common
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
```
Installation [Official documentation](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html#installing-ansible-on-ubuntu)


## Google Cloud Platform
Ansible contains modules for managing Google Cloud Platform resources, including creating instances, controlling network access, working with persistent disks, managing load balancers, and a lot more.

The Ansible GCP modules require both the `requests` and the `google-auth` libraries to be installed:

```
sudo apt install python-pip
pip install requests google-auth
```


## Google Cloud Platform - GCE instance

In this example we are going to create a Playbook to provision and configure a GCE instance in a Debian 10 Buster disk, installing a Python Flask web server application.

These are the steps:

1. Create a service account
2. Set up OS Login
3. (Conditional) Set user permission to `~/.ansible/cp/`
4. Create Playbook

### 1. Create a Service Account

We are going to create a Service Account for creating and managing GCE instances.

```
for role in \
  'roles/compute.instanceAdmin' \
  'roles/compute.instanceAdmin.v1' \
  'roles/compute.osAdminLogin' \
  'roles/iam.serviceAccountUser'
do \
  gcloud projects add-iam-policy-binding \
    [PROJECT_ID]\
    --member='serviceAccount:[SERVICE_ACCOUNT]' \
    --role="${role}"
done
```

### 2. Set up OS Login

OS Login lets you securely SSH into GCE instances when using a service account

1. Enable OS Login in project-wide metadata so that it applies to all of the instances in your project
```
gcloud compute project-info add-metadata \
    --metadata enable-oslogin=TRUE
```

2. Configuring OS Login roles on a service account
```
gcloud compute instances add-iam-policy-binding [MY_INSTANCE] --member='user=[SERVICE_ACCOUNT]' --role='roles/compute.osAdminLogin'
gcloud compute instances add-iam-policy-binding [MY_INSTANCE] --member='user=[SERVICE_ACCOUNT]' --role='roles/compute.iam.serviceAccountUser'
```

3. Generating Service Account Key file
```
gcloud iam service-accounts keys create --iam-account [SERVICE_ACCOUNT] [FILE].json
```

4. Activate service account 
```
gcloud auth activate-service-account --key-file=Downloads/[FILE].json
```

5. Adding SSH keys to a user account
```
gcloud compute os-login ssh-keys add --key-file .ssh/id_rsa.pub
```

6. Switch back from service account
```
gcloud config set account your@gmail.com
```

7. Gather service account `uniqueId`
```
gcloud iam service-accounts describe \
    [SERVICE_ACCOUNT] \
        --format='value(uniqueId)'
```

8. (Optional) SSH into an instance using a service account

If you have previous instances created, you can SSH into them:

```
ssh -i .ssh/id_rsa [sa_<uniqueId>]@[INSTANCE_IP]
```

Note that we prefixed the `uniqueId` with `sa_`

### 3. (Conditional) Set user permissions to .ansible/cp/ 

If you are using a Playbook with `add_host` module, you must give user permissions to `~/.ansible/cp/` directory:

```
sudo chown -R $USER:$USER ~/.ansible/cp
```

### 4. Create Playbook

You can download the git repository at [git repository](git repository)

`cd` into the downloaded directory and run:

```
ansible-playbook [FILE].yml -u [sa_<uniqueId>] 
```
