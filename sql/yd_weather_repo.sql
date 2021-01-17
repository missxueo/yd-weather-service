/*
 Navicat Premium Data Transfer

 Source Server         : uplus.host
 Source Server Type    : MySQL
 Source Server Version : 80021
 Source Host           : www.uplus.host:3306
 Source Schema         : yd_weather_repo

 Target Server Type    : MySQL
 Target Server Version : 80021
 File Encoding         : 65001

 Date: 17/01/2021 18:13:43
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_area
-- ----------------------------
DROP TABLE IF EXISTS `t_area`;
CREATE TABLE `t_area`  (
  `area_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `area_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sort_no` int NULL DEFAULT 0,
  `level` tinyint(1) NOT NULL DEFAULT 0,
  `parent_area_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`area_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '地区表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_area
-- ----------------------------
INSERT INTO `t_area` VALUES ('10101', '北京', 0, 1, '0');
INSERT INTO `t_area` VALUES ('101010100', '北京', 0, 3, '10101');
INSERT INTO `t_area` VALUES ('101010300', '朝阳', 0, 3, '10101');
INSERT INTO `t_area` VALUES ('101020100', '上海', 0, 3, '0');
INSERT INTO `t_area` VALUES ('10121', '浙江', 0, 1, '0');
INSERT INTO `t_area` VALUES ('1012101', '杭州', 1, 2, '10121');
INSERT INTO `t_area` VALUES ('101210101', '杭州', 1, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210101001', '浦沿街道', 1, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101002', '西兴街道', 2, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101003', '长河街道', 3, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101004', '半山街道', 4, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101005', '大关街道', 5, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101006', '拱宸桥街道', 6, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101007', '和睦街道', 7, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101008', '湖墅街道', 8, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101009', '康桥街道', 9, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101010', '米市巷街道', 10, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101011', '上塘街道', 11, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101012', '祥符街道', 12, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210101013', '小河街道', 13, 4, '101210112');
INSERT INTO `t_area` VALUES ('101210102', '萧山', 2, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210103', '桐庐', 3, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210104', '淳安', 4, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210105', '建德', 5, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210106', '余杭', 6, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210107', '临安', 7, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210108', '富阳', 8, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210109', '上城', 9, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210110', '下城', 10, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210111', '江干', 11, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210112', '拱墅', 12, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210113', '西湖', 13, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210114', '滨江', 14, 3, '1012101');
INSERT INTO `t_area` VALUES ('101210201', '湖州\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101210301', '嘉兴\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101210401', '宁波\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101210501', '绍兴\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101210601', '台州\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101210701', '温州\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101210801', '丽水\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101210901', '金华\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101211001', '衢州\r\n', 0, 3, '10121');
INSERT INTO `t_area` VALUES ('101211101', '舟山\r\n', 0, 3, '10121');

-- ----------------------------
-- Table structure for t_dict
-- ----------------------------
DROP TABLE IF EXISTS `t_dict`;
CREATE TABLE `t_dict`  (
  `dict_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dict_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `descirbe` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`dict_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典头' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_dict
-- ----------------------------

-- ----------------------------
-- Table structure for t_dict_value
-- ----------------------------
DROP TABLE IF EXISTS `t_dict_value`;
CREATE TABLE `t_dict_value`  (
  `dv_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dv_label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `descirbe` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `dict_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sort_no` int NULL DEFAULT NULL,
  PRIMARY KEY (`dv_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '字典值' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_dict_value
-- ----------------------------

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `id` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '用户昵称',
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号',
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user
-- ----------------------------

-- ----------------------------
-- Table structure for t_weather_error_feedback
-- ----------------------------
DROP TABLE IF EXISTS `t_weather_error_feedback`;
CREATE TABLE `t_weather_error_feedback`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `create_by` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `area_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `actual_weather_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户天气纠错反馈' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_weather_error_feedback
-- ----------------------------

-- ----------------------------
-- Table structure for t_weather_forecast
-- ----------------------------
DROP TABLE IF EXISTS `t_weather_forecast`;
CREATE TABLE `t_weather_forecast`  (
  `id` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `area_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `temperature_lowest` tinyint NULL DEFAULT NULL,
  `temperature_highest` tinyint NULL DEFAULT NULL,
  `weather_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '天气类别',
  `wind_level` tinyint NULL DEFAULT NULL COMMENT '风等级',
  `wind_direction` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '风向',
  `air_quality_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '空气质量',
  `air_quality_value` int NULL DEFAULT NULL COMMENT '空气质量值',
  `air_humidity` int NULL DEFAULT NULL COMMENT '空气湿度',
  `rain_percent` int NULL DEFAULT NULL COMMENT '降水概率',
  `forecast_date` date NOT NULL COMMENT '预测日期',
  `create_time` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '天气预测记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_weather_forecast
-- ----------------------------
INSERT INTO `t_weather_forecast` VALUES ('101010100^20210117', '101010100', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 15:21:00');
INSERT INTO `t_weather_forecast` VALUES ('101010300^20210117', '101010300', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:00');
INSERT INTO `t_weather_forecast` VALUES ('101020100^20210117', '101020100', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:00');
INSERT INTO `t_weather_forecast` VALUES ('101210101^20210117', '101210101', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:00');
INSERT INTO `t_weather_forecast` VALUES ('101210102^20210117', '101210102', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:01');
INSERT INTO `t_weather_forecast` VALUES ('101210103^20210117', '101210103', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:01');
INSERT INTO `t_weather_forecast` VALUES ('101210104^20210117', '101210104', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 15:21:00');
INSERT INTO `t_weather_forecast` VALUES ('101210105^20210117', '101210105', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:01');
INSERT INTO `t_weather_forecast` VALUES ('101210106^20210117', '101210106', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:01');
INSERT INTO `t_weather_forecast` VALUES ('101210107^20210117', '101210107', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:01');
INSERT INTO `t_weather_forecast` VALUES ('101210108^20210117', '101210108', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:01');
INSERT INTO `t_weather_forecast` VALUES ('101210109^20210117', '101210109', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:01');
INSERT INTO `t_weather_forecast` VALUES ('101210110^20210117', '101210110', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:01');
INSERT INTO `t_weather_forecast` VALUES ('101210111^20210117', '101210111', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 15:21:00');
INSERT INTO `t_weather_forecast` VALUES ('101210112^20210117', '101210112', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101210113^20210117', '101210113', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101210114^20210117', '101210114', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101210201^20210117', '101210201', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 15:21:01');
INSERT INTO `t_weather_forecast` VALUES ('101210301^20210117', '101210301', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101210401^20210117', '101210401', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101210501^20210117', '101210501', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101210601^20210117', '101210601', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 15:21:01');
INSERT INTO `t_weather_forecast` VALUES ('101210701^20210117', '101210701', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101210801^20210117', '101210801', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101210901^20210117', '101210901', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101211001^20210117', '101211001', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 16:00:02');
INSERT INTO `t_weather_forecast` VALUES ('101211101^20210117', '101211101', 1, 19, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17', '2021-01-17 15:21:01');

-- ----------------------------
-- Table structure for t_weather_record
-- ----------------------------
DROP TABLE IF EXISTS `t_weather_record`;
CREATE TABLE `t_weather_record`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `area_code` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `real_temperature` tinyint NULL DEFAULT NULL,
  `weather_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '天气类别',
  `wind_level` tinyint NULL DEFAULT NULL COMMENT '风等级',
  `wind_direction` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '风向',
  `air_quality_type` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '空气质量',
  `air_quality_value` int NULL DEFAULT NULL COMMENT '空气质量值',
  `air_humidity` int NULL DEFAULT NULL COMMENT '空气温度',
  `rain_percent` int NULL DEFAULT NULL COMMENT '降水概率',
  `create_time` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '天气实时记录表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_weather_record
-- ----------------------------
INSERT INTO `t_weather_record` VALUES (1, '101010100', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 15:21:00');
INSERT INTO `t_weather_record` VALUES (2, '101210104', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 15:21:00');
INSERT INTO `t_weather_record` VALUES (3, '101210111', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 15:21:00');
INSERT INTO `t_weather_record` VALUES (4, '101210201', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 15:21:00');
INSERT INTO `t_weather_record` VALUES (5, '101210601', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 15:21:01');
INSERT INTO `t_weather_record` VALUES (6, '101211101', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 15:21:01');
INSERT INTO `t_weather_record` VALUES (7, '101010100', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:00');
INSERT INTO `t_weather_record` VALUES (8, '101010300', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:00');
INSERT INTO `t_weather_record` VALUES (9, '101020100', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:00');
INSERT INTO `t_weather_record` VALUES (10, '101210101', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:00');
INSERT INTO `t_weather_record` VALUES (11, '101210102', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (12, '101210103', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (13, '101210104', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (14, '101210105', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (15, '101210106', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (16, '101210107', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (17, '101210108', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (18, '101210109', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (19, '101210110', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (20, '101210111', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (21, '101210112', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:01');
INSERT INTO `t_weather_record` VALUES (22, '101210113', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (23, '101210114', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (24, '101210201', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (25, '101210301', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (26, '101210401', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (27, '101210501', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (28, '101210601', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (29, '101210701', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (30, '101210801', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (31, '101210901', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (32, '101211001', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (33, '101211101', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 16:00:02');
INSERT INTO `t_weather_record` VALUES (34, '101010100', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (35, '101010300', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (36, '101020100', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (37, '101210101', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (38, '101210102', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (39, '101210103', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (40, '101210104', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (41, '101210105', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (42, '101210106', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (43, '101210107', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (44, '101210108', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (45, '101210109', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (46, '101210110', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (47, '101210111', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (48, '101210112', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:00');
INSERT INTO `t_weather_record` VALUES (49, '101210113', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (50, '101210114', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (51, '101210201', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (52, '101210301', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (53, '101210401', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (54, '101210501', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (55, '101210601', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (56, '101210701', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (57, '101210801', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (58, '101210901', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (59, '101211001', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');
INSERT INTO `t_weather_record` VALUES (60, '101211101', 15, 'NO_CLOUD', 1, 'w2e', '空气良好', 3, 10, NULL, '2021-01-17 17:00:01');

SET FOREIGN_KEY_CHECKS = 1;
