CREATE TABLE "admin_teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_id" text NOT NULL, CONSTRAINT "team_id" UNIQUE ("team_id"), CONSTRAINT "PK_21137aa0d64c993e35e4e1f0205" PRIMARY KEY ("id"));
CREATE TABLE "kube_config_files_metadata" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "file_type" text NOT NULL, "file_name" text NOT NULL, "storage_path" text NOT NULL, "service_account_file_path" text, CONSTRAINT "PK_e69361f2a0258c7db3f466358c8" PRIMARY KEY ("id"));
CREATE TABLE "projects_audit" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "operation_time" TIMESTAMP(5) WITH TIME ZONE DEFAULT now(), "properties" text NOT NULL, "message" text NOT NULL, "resource_id" uuid NOT NULL, "operated_by" text NOT NULL, "operation_status" text NOT NULL, "operation_type" text NOT NULL, CONSTRAINT "PK_75511bb4ee64cc45dff3f61279a" PRIMARY KEY ("id"));
CREATE TABLE "project_variables" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "value" text NOT NULL, "description" text NOT NULL, "mapping_id" integer DEFAULT '0', "project_id" uuid NOT NULL, "mapping_type" text NOT NULL, CONSTRAINT "PK_b4aa21d7eabafa0d126615158d9" PRIMARY KEY ("id"));
CREATE TABLE "mappings_master" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mapping_type" text NOT NULL, CONSTRAINT "default__mappings_master__mapping_type" UNIQUE ("mapping_type"), CONSTRAINT "PK_4f6fa1d797495917fca037b1fa8" PRIMARY KEY ("id"));
CREATE TABLE "deployment_app_environment_variables" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "value" text NOT NULL, "mapping_id" bigint, "in_use" boolean DEFAULT false, "mapping_type" text NOT NULL, "deployment_id" uuid NOT NULL, CONSTRAINT "PK_1e763181709e250e670e03dcbde" PRIMARY KEY ("id"));
CREATE TABLE "deployments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "staged_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "deployed_at" TIMESTAMP(6) WITH TIME ZONE, "error_msg" text, "is_currently_deployed" boolean DEFAULT false, "selected_env_type" text NOT NULL, "is_deleted" boolean DEFAULT false, "staged_by" text NOT NULL, "deployed_by" text, "build_id" uuid NOT NULL, "status" text NOT NULL, CONSTRAINT "PK_1e5627acb3c950deb83fe98fc48" PRIMARY KEY ("id"));
CREATE TABLE "app_deploy_credentials" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "cred_id" text NOT NULL, "label" text NOT NULL, "is_deleted" boolean DEFAULT false, CONSTRAINT "app_deploy_cred_label" UNIQUE ("label"), CONSTRAINT "PK_bf4071bcd52f93af09e6a7ee176" PRIMARY KEY ("id"));
CREATE TABLE "builds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "docker_img_url" text, "app_environments" text, "version" text, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "is_deployed" boolean DEFAULT false, "app_type" text, "branch_name" text, "repo_url" text, "jenkins_build_num" text, "docker_ui_api_img_url" text, "is_deleted" boolean DEFAULT false, "app_id" uuid NOT NULL, "created_by" text NOT NULL, "deploy_cred" uuid, "status" text NOT NULL, CONSTRAINT "app_version" UNIQUE ("app_id", "version"), CONSTRAINT "PK_c181c897db1d7b044faace6e86c" PRIMARY KEY ("id"));
CREATE TABLE "application_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_id" text NOT NULL, "edit_application" boolean NOT NULL, "build_application" boolean NOT NULL, "deploy" boolean NOT NULL, "stage" boolean NOT NULL, "read_only" boolean NOT NULL, "tracing" boolean NOT NULL, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "create_storage" text NOT NULL, "storage_list" text NOT NULL, "project_id" uuid NOT NULL, "app_id" uuid NOT NULL, "created_by" text NOT NULL, "updated_by" text NOT NULL, CONSTRAINT "PK_070ac5944b82cccc913202d5648" PRIMARY KEY ("id"));
CREATE TABLE "domain_mapping_files_metadata" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "certificate_file_name" text NOT NULL, "key_file_name" text NOT NULL, "certificate_type" text NOT NULL, "key_type" text NOT NULL, "certificate_path" text NOT NULL, "key_path" text NOT NULL, "domain_name" text NOT NULL, "secret" text NOT NULL, "label" text NOT NULL, "domain_type" text NOT NULL, "project_id" uuid, CONSTRAINT "PK_2b6bbf54da11405b03034d1a9af" PRIMARY KEY ("id"));
CREATE TABLE "applications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "display_name" text NOT NULL, "app_name" text NOT NULL, "current_build_id" bigint, "created_by" text NOT NULL, "updated_by" text NOT NULL, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "job_name" text, "repo_url" text, "branch_name" text, "app_type" text, "end_app_access_url" text, "is_deleted" boolean NOT NULL, "sub_domain" text, "project_id" uuid NOT NULL, "credentials" uuid, "status" text NOT NULL, "domain_id" uuid NOT NULL, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"));
CREATE TABLE "applications_audits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "operation_time" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "properties" text NOT NULL, "message" text NOT NULL, "resource_id" uuid NOT NULL, "operated_by" text NOT NULL, "operation_status" text NOT NULL, "operation_type" text NOT NULL, "build_id" uuid, "deployment_id" uuid, CONSTRAINT "PK_8e142a363bbd1890ae6fcc383cc" PRIMARY KEY ("id"));
CREATE TABLE "team_audits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "operation_time" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "properties" text NOT NULL, "organisation_id" text NOT NULL, "resource_id" text NOT NULL, "message" text NOT NULL, "operated_by" text NOT NULL, "operation_type" text NOT NULL, "operation_status" text NOT NULL, CONSTRAINT "PK_10c219485591b902260bdd1f2ba" PRIMARY KEY ("id"));
CREATE TABLE "user_audits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "properties" text NOT NULL, "operation_time" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "organisation_id" text NOT NULL, "message" text NOT NULL, "operation_type" text NOT NULL, "operation_status" text NOT NULL, "operated_by" text NOT NULL, "username" text NOT NULL, CONSTRAINT "PK_05430a6b832feb7f5dd1a91c0ce" PRIMARY KEY ("id"));
CREATE TABLE "audits_master" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "default__audits_master__name" UNIQUE ("name"), CONSTRAINT "default__name" UNIQUE ("name"), CONSTRAINT "PK_3d6900c3c4a77504675d71b08f7" PRIMARY KEY ("id"));
CREATE TABLE "environments_audits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "operation_time" TIMESTAMP(5) WITH TIME ZONE DEFAULT now(), "properties" text NOT NULL, "message" text NOT NULL, "organisation_id" text NOT NULL, "resource_id" uuid, "operated_by" text NOT NULL, "operation_status" text NOT NULL, "operation_type" text NOT NULL, CONSTRAINT "PK_b06a23d092455ebcca0904b280f" PRIMARY KEY ("id"));
CREATE TABLE "status_master" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "default__status_master__name" UNIQUE ("name"), CONSTRAINT "default__name" UNIQUE ("name"), CONSTRAINT "PK_379c22d9ac2075abd0697b534a7" PRIMARY KEY ("id"));
CREATE TABLE "providers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "display_name" text NOT NULL, CONSTRAINT "PK_af13fc2ebf382fe0dad2e4793aa" PRIMARY KEY ("id"));
CREATE TABLE "environment_permissions" ("id" character varying NOT NULL, "team_id" text NOT NULL, "env_monitor" boolean NOT NULL, "create_project" boolean NOT NULL, "deploy" boolean NOT NULL, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "env_id" uuid NOT NULL, "created_by" text NOT NULL, "updated_by" text NOT NULL, CONSTRAINT "PK_1542e57fcb2e22ef6477c565752" PRIMARY KEY ("id"));
CREATE TABLE "project_permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_id" text NOT NULL, "create_applications" boolean NOT NULL, "create_storage" boolean NOT NULL, "storage_list" boolean NOT NULL, "variables_create" boolean NOT NULL, "variables_update" boolean NOT NULL, "variables_read" boolean NOT NULL, "deploy" boolean NOT NULL, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "env_id" uuid NOT NULL, "project_id" uuid NOT NULL, "created_by" text NOT NULL, "updated_by" text NOT NULL, CONSTRAINT "PK_bebd29c1039fb4f11c2727567e4" PRIMARY KEY ("id"));
CREATE TABLE "environments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "display_name" text NOT NULL, "organisation_id" text NOT NULL, "cluster_name" text NOT NULL, "cluster_url" text NOT NULL, "description" text NOT NULL, "error_msg" text NOT NULL, "created_at" TIMESTAMP(5) WITH TIME ZONE DEFAULT now(), "last_updated_at" TIMESTAMP(5) WITH TIME ZONE DEFAULT now(), "tenant_label" text, "kube_config_id" uuid NOT NULL, "status" text NOT NULL, "created_by" text NOT NULL, "last_updated_by" text NOT NULL, "provider" uuid NOT NULL, CONSTRAINT "REL_8e0f6cde63004a402fc1d36143" UNIQUE ("kube_config_id"), CONSTRAINT "CHK_352039ba8e5d9297fb695f652b" CHECK (char_length("display_name")>=4), CONSTRAINT "PK_ec32d12469ec3c2f2f20c4f5e71" PRIMARY KEY ("id"));
CREATE TABLE "storage" ("id" character varying NOT NULL, "app_id" text, "display_name" text NOT NULL, "storage_class" text NOT NULL, "storage_path" text NOT NULL, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "project_id" uuid NOT NULL, CONSTRAINT "PK_f9b67a9921474d86492aad2e027" PRIMARY KEY ("id"));
CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "name_space" text NOT NULL, "status" text NOT NULL, "created_at" TIMESTAMP(5) WITH TIME ZONE DEFAULT now(), "last_updated_at" TIMESTAMP(5) WITH TIME ZONE DEFAULT now(), "error_msg" text, "organisation_id" text NOT NULL, "is_deleted" boolean DEFAULT false, "environment_id" uuid NOT NULL, "created_by" text NOT NULL, "last_updated_by" text NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"));
CREATE TABLE "team_members" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "team_id" text NOT NULL, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "users" text NOT NULL, "created_by" text NOT NULL, "updated_by" text NOT NULL, CONSTRAINT "PK_ca3eae89dcf20c9fd95bf7460aa" PRIMARY KEY ("id"));
CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" text NOT NULL, "last_name" text NOT NULL, "username" text NOT NULL, "userkey" text NOT NULL, "organisation_id" text NOT NULL, "created_by" text NOT NULL, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT CURRENT TIMESTAMP, "updated_by" text NOT NULL, "updated_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT CURRENT TIMESTAMP, "is_deleted" boolean NOT NULL, CONSTRAINT "default__users__username" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"));
CREATE TABLE "app_configs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpu_request" numeric(5,0) NOT NULL, "cpu_limit" numeric(5,0) NOT NULL, "memory_request" integer NOT NULL, "memory_limit" integer NOT NULL, "min_replicas" integer NOT NULL, "max_replicas" integer NOT NULL, "hpa_cpu_threshold" integer NOT NULL, "created_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP(6) WITH TIME ZONE DEFAULT now(), "updated_by" text NOT NULL, "app_id" uuid NOT NULL, CONSTRAINT "REL_493753cbbf436084b732066b90" UNIQUE ("app_id"), CONSTRAINT "PK_8a1d238ffa110c84b1302a87ae9" PRIMARY KEY ("id"));
CREATE TABLE "app_default_configs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpu_request" numeric(5,0) NOT NULL, "cpu_limit" numeric(5,0) NOT NULL, "memory_request" integer NOT NULL, "memory_limit" integer NOT NULL, "min_replicas" integer NOT NULL, "max_replicas" integer NOT NULL, "hpa_cpu_threshold" integer NOT NULL, "app_type" text NOT NULL, CONSTRAINT "PK_31163d1c7816e6637386a2b5588" PRIMARY KEY ("id"));
CREATE TABLE "jenkins_master" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "organisation_id" text NOT NULL, "jenkins_base_path" text NOT NULL, "jenkins_username" text NOT NULL, "jenkins_token" text NOT NULL, "jenkins_auth" text NOT NULL, "jenkins_default_job_name" text NOT NULL, CONSTRAINT "PK_2099f62ce4629ddf9ea55d62505" PRIMARY KEY ("id"));
ALTER TABLE "projects_audit" ADD CONSTRAINT "FK_593cadbe4e4ab81a8dce732e264" FOREIGN KEY ("resource_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "projects_audit" ADD CONSTRAINT "FK_2cd3bd057ad35f835bde098e131" FOREIGN KEY ("operated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "projects_audit" ADD CONSTRAINT "FK_8962ae6314720bba618596fb92b" FOREIGN KEY ("operation_status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "projects_audit" ADD CONSTRAINT "FK_da7fd1138932f6b38aaac626ac1" FOREIGN KEY ("operation_type") REFERENCES "audits_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "project_variables" ADD CONSTRAINT "FK_a33ab1e07479c2cf1c06a4815bc" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "project_variables" ADD CONSTRAINT "FK_0f23e9fa2ad9efa4800c7a1c5ab" FOREIGN KEY ("mapping_type") REFERENCES "mappings_master"("mapping_type") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "deployment_app_environment_variables" ADD CONSTRAINT "FK_3f7fd28d46e71d4c071e22357aa" FOREIGN KEY ("mapping_type") REFERENCES "mappings_master"("mapping_type") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "deployment_app_environment_variables" ADD CONSTRAINT "FK_5d87f32779ff22aa030441ee336" FOREIGN KEY ("deployment_id") REFERENCES "deployments"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "deployments" ADD CONSTRAINT "FK_d4098776b06e3df548300c7c45c" FOREIGN KEY ("staged_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "deployments" ADD CONSTRAINT "FK_673cb5b8ca5fa8f444fc0df3218" FOREIGN KEY ("deployed_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "deployments" ADD CONSTRAINT "FK_d3e6c2888a56d8a7c2bcd95c48f" FOREIGN KEY ("build_id") REFERENCES "builds"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "deployments" ADD CONSTRAINT "FK_38192398a94dfb55eb11527d012" FOREIGN KEY ("status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "builds" ADD CONSTRAINT "FK_231c3800bafae63c236c8966233" FOREIGN KEY ("app_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "builds" ADD CONSTRAINT "FK_301bd7bdc9a9fab9e93265a355a" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "builds" ADD CONSTRAINT "FK_8ff55568cd694dda89a42da3175" FOREIGN KEY ("deploy_cred") REFERENCES "app_deploy_credentials"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "builds" ADD CONSTRAINT "FK_d0b2f877a7b15edd094a538290e" FOREIGN KEY ("status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "application_permissions" ADD CONSTRAINT "FK_e48982c997834ad57225f4ded25" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "application_permissions" ADD CONSTRAINT "FK_8af225f02be25e39c2f612948eb" FOREIGN KEY ("app_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "application_permissions" ADD CONSTRAINT "FK_cab13493e132513b0f4ec039db2" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "application_permissions" ADD CONSTRAINT "FK_f02aa2eb7585daf8452e3c759e0" FOREIGN KEY ("updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "domain_mapping_files_metadata" ADD CONSTRAINT "FK_fba2c6d71e3db21dc0ee98146a4" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications" ADD CONSTRAINT "FK_195e4ab3a0c3d55aa2d1e35a3bb" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications" ADD CONSTRAINT "FK_c609d379f6367925a2eaf2fb418" FOREIGN KEY ("credentials") REFERENCES "app_deploy_credentials"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications" ADD CONSTRAINT "FK_8ee114cee92e995a9e75c05cfbe" FOREIGN KEY ("status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications" ADD CONSTRAINT "FK_d312393175a3b79027d6d346f1a" FOREIGN KEY ("domain_id") REFERENCES "domain_mapping_files_metadata"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications_audits" ADD CONSTRAINT "FK_fad5e9096ab51c72da0a27fbca4" FOREIGN KEY ("resource_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications_audits" ADD CONSTRAINT "FK_8f54df43840d65c3d1c0cf261d7" FOREIGN KEY ("operated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications_audits" ADD CONSTRAINT "FK_c63c98ff803e23985b0590f2001" FOREIGN KEY ("operation_status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications_audits" ADD CONSTRAINT "FK_8cb19dc0819534351fd40a00ba4" FOREIGN KEY ("operation_type") REFERENCES "audits_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications_audits" ADD CONSTRAINT "FK_cca4788f2bf0835e1acf0b2d5e6" FOREIGN KEY ("build_id") REFERENCES "builds"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "applications_audits" ADD CONSTRAINT "FK_9c94aed05c96aa870417b70b0ea" FOREIGN KEY ("deployment_id") REFERENCES "deployments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "team_audits" ADD CONSTRAINT "FK_31c1f583045e89401f8006bfcdf" FOREIGN KEY ("operated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "team_audits" ADD CONSTRAINT "FK_effbe42cb81431e67fccd273136" FOREIGN KEY ("operation_type") REFERENCES "audits_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "team_audits" ADD CONSTRAINT "FK_f92138b0d2728470166982e9144" FOREIGN KEY ("operation_status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "user_audits" ADD CONSTRAINT "FK_eb8539f17cbe2cabbffaf55528f" FOREIGN KEY ("operation_type") REFERENCES "audits_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "user_audits" ADD CONSTRAINT "FK_dc2a418cec42c6b7bb7db70cf8f" FOREIGN KEY ("operation_status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "user_audits" ADD CONSTRAINT "FK_26bede498003b794cce7eca0cec" FOREIGN KEY ("operated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "user_audits" ADD CONSTRAINT "FK_b96de1fcbd4e0ae140b2a5e07a0" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments_audits" ADD CONSTRAINT "FK_43ffd53cf9a1343b746a1c61e27" FOREIGN KEY ("resource_id") REFERENCES "environments"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments_audits" ADD CONSTRAINT "FK_313fa1cdaea3218a2a372436eb1" FOREIGN KEY ("operated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments_audits" ADD CONSTRAINT "FK_a5316839ef0334b3af57c42b1f4" FOREIGN KEY ("operation_status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments_audits" ADD CONSTRAINT "FK_71361ce4c596c7cf909e2cebdd4" FOREIGN KEY ("operation_type") REFERENCES "audits_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environment_permissions" ADD CONSTRAINT "FK_bf18985df0be20b48dc28bf4f6e" FOREIGN KEY ("env_id") REFERENCES "environments"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environment_permissions" ADD CONSTRAINT "FK_31e78e2f9e5762b3032a7fa1fe4" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environment_permissions" ADD CONSTRAINT "FK_a246e138ea2d36ebdc786511d69" FOREIGN KEY ("updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "project_permissions" ADD CONSTRAINT "FK_718c3e3ce067080423b30aa3145" FOREIGN KEY ("env_id") REFERENCES "environments"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "project_permissions" ADD CONSTRAINT "FK_584bd3498e99449311acc725b98" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "project_permissions" ADD CONSTRAINT "FK_3f6fdb23ec334d058ddd57bdb4a" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "project_permissions" ADD CONSTRAINT "FK_da34949ac06b8a45044f6dd4109" FOREIGN KEY ("updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments" ADD CONSTRAINT "FK_8e0f6cde63004a402fc1d361431" FOREIGN KEY ("kube_config_id") REFERENCES "kube_config_files_metadata"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments" ADD CONSTRAINT "FK_d23339c86579ed4fd5d9eea6798" FOREIGN KEY ("status") REFERENCES "status_master"("name") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments" ADD CONSTRAINT "FK_116e9bce4c2372fde31c966af69" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments" ADD CONSTRAINT "FK_18bb24d3e86b19a2cc7645e4243" FOREIGN KEY ("last_updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "environments" ADD CONSTRAINT "FK_f2a145951d7a3e39a9b6820263f" FOREIGN KEY ("provider") REFERENCES "providers"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "storage" ADD CONSTRAINT "FK_686970d7d54949c6c6244ca3f4e" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "projects" ADD CONSTRAINT "FK_74f1288fff042a9992aa86744e4" FOREIGN KEY ("environment_id") REFERENCES "environments"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "projects" ADD CONSTRAINT "FK_8a7ccdb94bcc8635f933c8f8080" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "projects" ADD CONSTRAINT "FK_81d9494f7fc4c9fbf0a2ecfcc24" FOREIGN KEY ("last_updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "team_members" ADD CONSTRAINT "FK_50ccb6821d1f38d346c6eac76ac" FOREIGN KEY ("users") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "team_members" ADD CONSTRAINT "FK_07bf0c2fc6fa7c2908e81546018" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "team_members" ADD CONSTRAINT "FK_9140a7f74b1aeb64e0f83d4bda2" FOREIGN KEY ("updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "app_configs" ADD CONSTRAINT "FK_fea44a2a325bb5e0b6d211d726f" FOREIGN KEY ("updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE "app_configs" ADD CONSTRAINT "FK_493753cbbf436084b732066b900" FOREIGN KEY ("app_id") REFERENCES "applications"("id") ON DELETE RESTRICT ON UPDATE RESTRICT;