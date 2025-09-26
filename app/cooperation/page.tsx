"use client";

import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@nextui-org/react";
import Link from "next/link";
import {
  School,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Building2,
  GraduationCap,
  Target,
  Handshake,
  MapPin,
  Calendar,
  Phone,
  Mail
} from "lucide-react";

export default function CooperationPage() {
  const partnerships = [
    {
      name: "榆林师范学院",
      type: "师范教育合作",
      description: "在师范教育、教师培训等方面开展深度合作，提升教师专业素养",
      features: ["师资培训", "教学资源共享", "学历提升通道", "教研合作"],
      established: "2018年",
      students: "200+",
      icon: School,
      color: "gray"
    },
    {
      name: "榆林工业学校",
      type: "技能教育合作",
      description: "在工业技术、职业技能培训等领域建立合作关系，共同培养技能人才",
      features: ["实训基地共建", "师资互派", "技能竞赛", "就业推荐"],
      established: "2019年",
      students: "150+",
      icon: Building2,
      color: "slate"
    },
    {
      name: "陕西省艺术学校",
      type: "艺术教育合作",
      description: "在艺术教育、文化传承等方面开展合作，丰富学生文化素养",
      features: ["艺术课程", "文化活动", "师资交流", "展演合作"],
      established: "2020年",
      students: "80+",
      icon: GraduationCap,
      color: "zinc"
    }
  ];

  const cooperationModels = [
    {
      title: "联合培养",
      description: "与合作院校共同制定培养方案，实现资源优势互补",
      icon: Users,
      benefits: ["双重学籍管理", "优质教育资源", "多元化发展路径"]
    },
    {
      title: "师资共享",
      description: "建立师资交流机制，提升教学质量和专业水平",
      icon: BookOpen,
      benefits: ["专家授课", "教学研讨", "业务培训"]
    },
    {
      title: "实训合作",
      description: "共建实训基地，为学生提供更好的实践平台",
      icon: Target,
      benefits: ["设备共享", "实习机会", "技能提升"]
    },
    {
      title: "就业推荐",
      description: "建立就业信息共享机制，拓宽学生就业渠道",
      icon: Award,
      benefits: ["就业指导", "岗位推荐", "职业规划"]
    }
  ];

  const achievements = [
    { label: "合作院校", value: "3所", desc: "建立稳定合作关系" },
    { label: "受益学生", value: "430+", desc: "累计培养学生数量" },
    { label: "合作项目", value: "12个", desc: "涵盖多个专业领域" },
    { label: "就业率", value: "95%", desc: "合作培养学生就业率" }
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
                <Handshake className="size-10 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800 bg-clip-text text-transparent dark:from-gray-300 dark:via-slate-300 dark:to-gray-200">
              联合办学
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              与优质院校深度合作，共享教育资源，为学生提供更广阔的发展平台和更优质的教育服务
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                as={Link}
                href="/about"
                color="primary"
                size="lg"
                className="shadow-lg"
              >
                了解学校
              </Button>
              <Button
                as={Link}
                href="/jobs"
                variant="bordered"
                size="lg"
              >
                就业服务
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 合作成果统计 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">合作成果</h2>
            <p className="text-gray-600 dark:text-gray-400">数字见证合作成效</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <CardBody className="text-center">
                    <div className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-1">{achievement.value}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{achievement.label}</div>
                    <div className="text-xs text-gray-500">{achievement.desc}</div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 合作院校 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">合作院校</h2>
            <p className="text-gray-600 dark:text-gray-400">与优质院校建立长期稳定的合作关系</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
            {partnerships.map((partner, index) => {
              const Icon = partner.icon;
              return (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                        {/* 左侧：基本信息 */}
                        <div className="lg:col-span-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50">
                              <Icon className="size-8 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{partner.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{partner.type}</p>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="size-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">合作始于 {partner.established}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="size-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">受益学生 {partner.students}</span>
                            </div>
                          </div>
                        </div>

                        {/* 中间：描述和特色 */}
                        <div className="lg:col-span-1">
                          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            {partner.description}
                          </p>

                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">合作特色：</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {partner.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="size-3 text-gray-500" />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* 右侧：操作按钮 */}
                        <div className="lg:col-span-1 text-center lg:text-right">
                          <div className="space-y-3">
                            <Button
                              color="primary"
                              variant="flat"
                              size="sm"
                              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                              endContent={<ArrowRight className="size-4" />}
                            >
                              了解详情
                            </Button>
                            <Button
                              variant="light"
                              size="sm"
                              className="block w-full lg:w-auto"
                            >
                              联系咨询
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 合作模式 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">合作模式</h2>
            <p className="text-gray-600 dark:text-gray-400">多元化合作方式，实现资源优势互补</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cooperationModels.map((model, index) => {
              const Icon = model.icon;
              return (
                <motion.div
                  key={model.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50">
                          <Icon className="size-6 text-gray-600 dark:text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold">{model.title}</h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {model.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">主要优势：</h4>
                        {model.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="size-4 text-gray-500" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 联系咨询 */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-6">联系咨询</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              如果您对我们的联合办学项目感兴趣，欢迎联系我们了解更多详情
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardBody className="p-6 text-center">
                  <MapPin className="size-6 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">学校地址</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">陕西省榆林市定边县</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6 text-center">
                  <Phone className="size-6 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">联系电话</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">0912-4212345</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6 text-center">
                  <Mail className="size-6 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">电子邮箱</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">cooperation@dbzj.edu.cn</p>
                </CardBody>
              </Card>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button
                as={Link}
                href="/about"
                color="primary"
                size="lg"
                className="shadow-lg"
              >
                了解学校
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


