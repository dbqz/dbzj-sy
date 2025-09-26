"use client";

import { motion } from "framer-motion";
import {
  School,
  Calendar,
  MapPin,
  Users,
  Award,
  Building2,
  TrendingUp,
  CheckCircle,
  Heart,
  Settings,
  Zap,
  Cog,
  Shirt,
  Hotel,
  Flame
} from "lucide-react";
import { Card, CardBody, Button } from "@nextui-org/react";
import Link from "next/link";

export default function AboutPage() {
  const stats = [
    { icon: Calendar, label: "建校时间", value: "1983年", desc: "40余年办学历史" },
    { icon: MapPin, label: "占地面积", value: "300亩", desc: "现代化校园环境" },
    { icon: School, label: "教学班", value: "42个", desc: "完善的教学体系" },
    { icon: Users, label: "在校学生", value: "2240名", desc: "优质生源保障" },
    { icon: Users, label: "教职工", value: "182人", desc: "专业师资团队" },
    { icon: Award, label: "办学等级", value: "国家级", desc: "重点中等职业学校" },
  ];

  const majors = [
    { name: "数控机床技术", desc: "培养现代制造业高技能人才", icon: Settings, hot: true },
    { name: "电子电工技术", desc: "电气自动化与智能控制", icon: Zap, hot: true },
    { name: "机械加工技术", desc: "传统与现代工艺结合", icon: Cog, hot: false },
    { name: "服装加工技术", desc: "时尚设计与制作工艺", icon: Shirt, hot: false },
    { name: "酒店服务管理", desc: "现代服务业管理人才", icon: Hotel, hot: false },
    { name: "电气焊技术", desc: "特种作业技能培训", icon: Flame, hot: true },
  ];

  const achievements = [
    "国家级重点中等职业学校",
    "陕西省示范性职业学校",
    "榆林市职业教育先进单位",
    "定边县教育系统先进集体",
  ];

  const facilities = [
    { name: "计算机实训室", count: "6个", desc: "现代化教学设备" },
    { name: "数控机床车间", count: "1个", desc: "高精度加工设备" },
    { name: "机械加工车间", count: "1个", desc: "传统工艺实训" },
    { name: "电气焊车间", count: "1个", desc: "安全作业环境" },
    { name: "服装加工车间", count: "1个", desc: "专业制作设备" },
    { name: "教学实验室", count: "17个", desc: "多学科实验平台" },
  ];

  return (
    <div>
      {/* 英雄区域 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-slate-50/50 to-gray-100/30 dark:from-gray-900 dark:via-gray-800/20 dark:to-slate-900/10">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-200/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-slate-200/15 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800/50">
                <School className="size-10 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800 bg-clip-text text-transparent dark:from-gray-300 dark:via-slate-300 dark:to-gray-200">
              定边县职业教育中心
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              始建于1983年10月，国家级重点中等职业学校，致力于培养高素质技能人才，为区域经济发展和社会进步贡献力量
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                as={Link}
                href="/campus"
                color="primary"
                size="lg"
                className="shadow-lg"
              >
                校园风光
              </Button>
              <Button
                as={Link}
                href="/news"
                variant="bordered"
                size="lg"
              >
                最新动态
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 统计数据 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">学校概况</h2>
            <p className="text-gray-600 dark:text-gray-400">数字见证我们的发展历程</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center"
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <CardBody className="text-center">
                      <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50 w-fit mx-auto mb-4">
                        <Icon className="size-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <div className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-1">{stat.value}</div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{stat.label}</div>
                      <div className="text-xs text-gray-500">{stat.desc}</div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 学校历史 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6">办学历程</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                    <Calendar className="size-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-2">1983年建校</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      定边县职业教育中心正式成立，开始了职业教育的探索之路，致力于为当地培养实用型技能人才。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800/50 flex items-center justify-center">
                    <Award className="size-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-2">国家级重点</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      经过多年发展，学校被评为国家级重点中等职业学校，办学质量和社会声誉不断提升。
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center">
                    <TrendingUp className="size-6 text-zinc-600 dark:text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-2">持续发展</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      不断完善教学设施，扩大办学规模，深化校企合作，为学生提供更好的教育和就业机会。
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-800/50 dark:to-slate-800/50 flex items-center justify-center">
                <div className="text-center">
                  <School className="size-20 text-gray-500 dark:text-gray-400 mx-auto mb-4" />
                  <p className="text-base font-medium text-gray-700 dark:text-gray-300">校园历史照片</p>
                  <p className="text-sm text-gray-500">展示学校发展历程</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 专业设置 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">专业设置</h2>
            <p className="text-gray-600 dark:text-gray-400">培养适应社会发展需要的高素质技能人才</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majors.map((major, index) => (
              <motion.div
                key={major.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50">
                        <major.icon className="size-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      {major.hot && (
                        <div className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full">
                          热门
                        </div>
                      )}
                    </div>
                    <h3 className="text-base font-semibold mb-2">{major.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{major.desc}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 实训设施 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">实训设施</h2>
            <p className="text-gray-600 dark:text-gray-400">完善的实训环境，理论与实践相结合</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Building2 className="size-5 text-gray-600 dark:text-gray-400" />
                      <h3 className="font-semibold">{facility.name}</h3>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{facility.count}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{facility.desc}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 办学成果 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">办学成果</h2>
            <p className="text-gray-600 dark:text-gray-400">荣誉见证实力，品质铸就未来</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="size-6 text-slate-600 dark:text-slate-400" />
                      <span className="font-medium">{achievement}</span>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Heart className="size-6 text-gray-500 dark:text-gray-400" />
              <h2 className="text-2xl md:text-3xl font-bold">携手共创美好未来</h2>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              欢迎有志青年加入我们，在这里开启技能成才之路，实现人生价值
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                as={Link}
                href="/cooperation"
                color="primary"
                size="lg"
                className="shadow-lg"
              >
                联合办学
              </Button>
              <Button
                as={Link}
                href="/jobs"
                variant="bordered"
                size="lg"
              >
                就业服务
              </Button>
              <Button
                as={Link}
                href="/campus"
                variant="light"
                size="lg"
              >
                校园参观
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


