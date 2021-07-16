CREATE TABLE `user` (
                        `id` bigint NOT NULL AUTO_INCREMENT,
                        `userid` varchar(255) NOT NULL DEFAULT '' COMMENT '用户id',
                        `username` varchar(255)  NOT NULL DEFAULT '' COMMENT '用户名称',
                        `password` varchar(255)  NOT NULL DEFAULT '' COMMENT '用户密码',
                        `email` varchar(255) NOT NULL DEFAULT '' COMMENT '邮箱',
                        `gender` char(5)  COMMENT '男｜女｜未公开',
                        `telephone` varchar(11) DEFAULT '' COMMENT '手机',
                        `age` int(3) DEFAULT 0 COMMENT '年龄',
                        `job` varchar(255) DEFAULT '' COMMENT '职业',
                        `birth` varchar(255) DEFAULT '' COMMENT '生日',
                        `icon` varchar(50) DEFAULT NULL COMMENT '图标',
                        `status` tinyint(4) DEFAULT NULL COMMENT '状态(0:禁止,1:正常)',
                        `role_id` int(10) unsigned NOT NULL COMMENT '角色编号',
                        `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                        `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                        PRIMARY KEY (`id`),
                        UNIQUE KEY `number_unique` (`userid`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 ;