"use client";

import { motion } from "framer-motion";
import { Card, CardBody, Button } from "@nextui-org/react";
import Link from "next/link";
import {
  Briefcase,
  Users,
  MapPin,
  TrendingUp,
  Award,
  CheckCircle,
  Building2,
  Target,
  Phone,
  Mail,
  // Calendar, // 未使用
  DollarSign,
  Star,
  ArrowRight,
  Factory,
  Wrench,
  Zap,
  Settings,
  BookOpen
} from "lucide-react";

export default function JobsPage() {
  const employmentStats = [
    { label: "就业率", value: "95%", desc: "毕业生整体就业率", icon: TrendingUp },
    { label: "合作企业", value: "50+", desc: "建立合作关系企业", icon: Building2 },
    { label: "输送学员", value: "1200+", desc: "累计向外输送学员", icon: Users },
    { label: "平均薪资", value: "4500元", desc: "毕业生平均月薪", icon: DollarSign }
  ];

  const employmentRegions = [
    {
      name: "靖江地区",
      description: "江苏靖江是我校重点就业输送地区，与多家知名企业建立长期合作关系",
      companies: ["靖江造船厂", "新时代造船", "扬子江药业", "靖江钢铁"],
      students: "300+",
      avgSalary: "5200元",
      industries: ["造船业", "制药业", "钢铁业", "机械制造"],
      icon: Factory,
      color: "gray"
    },
    {
      name: "长三角地区",
      description: "覆盖上海、苏州、无锡等发达城市，为学生提供更多发展机会",
      companies: ["上海重工", "苏州精密", "无锡制造", "南京科技"],
      students: "250+",
      avgSalary: "4800元",
      industries: ["精密制造", "电子科技", "汽车工业", "新能源"],
      icon: Building2,
      color: "slate"
    },
    {
      name: "珠三角地区",
      description: "深圳、广州、东莞等制造业发达地区，技能人才需求旺盛",
      companies: ["深圳富士康", "广州汽车", "东莞电子", "佛山制造"],
      students: "200+",
      avgSalary: "4600元",
      industries: ["电子制造", "汽车制造", "服装加工", "精密仪器"],
      icon: Wrench,
      color: "zinc"
    }
  ];

  const majorEmployment = [
    {
      major: "数控机床技术",
      employmentRate: "98%",
      avgSalary: "5500元",
      mainPositions: ["数控操作员", "机床维修工", "工艺技术员", "质量检验员"],
      demandRegions: ["靖江", "苏州", "无锡", "上海"],
      icon: Settings,
      hot: true
    },
    {
      major: "电子电工技术",
      employmentRate: "96%",
      avgSalary: "5000元",
      mainPositions: ["电工技师", "电气维修工", "自动化技术员", "电力运维员"],
      demandRegions: ["深圳", "广州", "东莞", "苏州"],
      icon: Zap,
      hot: true
    },
    {
      major: "机械加工技术",
      employmentRate: "94%",
      avgSalary: "4800元",
      mainPositions: ["机械操作工", "装配技术员", "机械维修工", "生产管理员"],
      demandRegions: ["靖江", "无锡", "宁波", "青岛"],
      icon: Wrench,
      hot: false
    },
    {
      major: "电气焊技术",
      employmentRate: "97%",
      avgSalary: "5200元",
      mainPositions: ["电焊工", "气焊工", "焊接技师", "焊接质检员"],
      demandRegions: ["靖江", "大连", "青岛", "烟台"],
      icon: Factory,
      hot: true
    }
  ];

  const services = [
    {
      title: "就业指导",
      description: "提供职业规划、简历制作、面试技巧等全方位就业指导服务",
      icon: Target,
      features: ["职业测评", "简历优化", "面试培训", "职场礼仪"]
    },
    {
      title: "企业推荐",
      description: "与优质企业建立合作关系，为学生推荐合适的就业岗位",
      icon: Building2,
      features: ["岗位匹配", "企业介绍", "薪资谈判", "入职跟踪"]
    },
    {
      title: "技能提升",
      description: "针对市场需求，提供专业技能培训和职业资格认证",
      icon: Award,
      features: ["技能培训", "资格认证", "实操练习", "考试辅导"]
    },
    {
      title: "跟踪服务",
      description: "毕业后持续跟踪学生就业情况，提供职业发展支持",
      icon: Users,
      features: ["就业回访", "职业咨询", "转岗指导", "继续教育"]
    }
  ];

  const successCases = [
    {
      name: "张明",
      major: "数控机床技术",
      company: "靖江造船厂",
      position: "数控技术员",
      salary: "6000元/月",
      year: "2023届",
      story: "通过学校推荐进入靖江造船厂，凭借扎实的专业技能快速适应工作，现已成为车间技术骨干"
    },
    {
      name: "李华",
      major: "电子电工技术",
      company: "苏州精密制造",
      position: "电气工程师",
      salary: "5500元/月",
      year: "2022届",
      story: "毕业后在苏州精密制造公司工作，负责生产线电气维护，工作表现优秀，多次获得公司嘉奖"
    },
    {
      name: "王芳",
      major: "服装加工技术",
      company: "东莞服装集团",
      position: "生产主管",
      salary: "4800元/月",
      year: "2021届",
      story: "从普通操作工做起，凭借专业技能和管理能力，两年内晋升为生产主管，管理30人团队"
    }
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
                <Briefcase className="size-10 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gray-700 via-slate-700 to-gray-800 bg-clip-text text-transparent dark:from-gray-300 dark:via-slate-300 dark:to-gray-200">
              就业服务
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              为学生提供全方位就业服务，与优质企业建立合作关系，重点向靖江等沿海发达地区输送技能人才
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
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
                href="/about"
                variant="bordered"
                size="lg"
              >
                了解学校
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 就业统计 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">就业成果</h2>
            <p className="text-gray-600 dark:text-gray-400">数字见证就业成效</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {employmentStats.map((stat, index) => {
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

      {/* 就业地区 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">主要就业地区</h2>
            <p className="text-gray-600 dark:text-gray-400">重点向沿海发达地区输送优秀学员</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-1">
            {employmentRegions.map((region, index) => {
              const Icon = region.icon;
              return (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardBody className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                        {/* 左侧：基本信息 */}
                        <div className="lg:col-span-1">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50">
                              <Icon className="size-8 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{region.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <MapPin className="size-4 text-gray-500" />
                                <span className="text-sm text-gray-600 dark:text-gray-400">重点就业区域</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="size-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">输送学员 {region.students}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="size-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-400">平均薪资 {region.avgSalary}</span>
                            </div>
                          </div>
                        </div>

                        {/* 中间：描述和行业 */}
                        <div className="lg:col-span-2">
                          <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            {region.description}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">主要企业：</h4>
                              <div className="space-y-1">
                                {region.companies.map((company, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <Building2 className="size-3 text-gray-500" />
                                    <span className="text-xs text-gray-600 dark:text-gray-400">{company}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-sm mb-2">主要行业：</h4>
                              <div className="space-y-1">
                                {region.industries.map((industry, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <Factory className="size-3 text-gray-500" />
                                    <span className="text-xs text-gray-600 dark:text-gray-400">{industry}</span>
                                  </div>
                                ))}
                              </div>
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
                              查看岗位
                            </Button>
                            <Button
                              variant="light"
                              size="sm"
                              className="block w-full lg:w-auto"
                            >
                              了解详情
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

      {/* 专业就业情况 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">专业就业情况</h2>
            <p className="text-gray-600 dark:text-gray-400">各专业就业率和薪资水平</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {majorEmployment.map((major, index) => {
              const Icon = major.icon;
              return (
                <motion.div
                  key={major.major}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50">
                            <Icon className="size-6 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{major.major}</h3>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-sm text-gray-600 dark:text-gray-400">就业率 {major.employmentRate}</span>
                              <span className="text-sm text-gray-600 dark:text-gray-400">平均薪资 {major.avgSalary}</span>
                            </div>
                          </div>
                        </div>
                        {major.hot && (
                          <div className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full">
                            热门
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">主要岗位：</h4>
                          <div className="space-y-1">
                            {major.mainPositions.map((position, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="size-3 text-gray-500" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{position}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-sm mb-2">需求地区：</h4>
                          <div className="space-y-1">
                            {major.demandRegions.map((region, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <MapPin className="size-3 text-gray-500" />
                                <span className="text-xs text-gray-600 dark:text-gray-400">{region}</span>
                              </div>
                            ))}
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

      {/* 就业服务 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">就业服务</h2>
            <p className="text-gray-600 dark:text-gray-400">全方位就业指导和服务支持</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
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
                        <h3 className="text-lg font-semibold">{service.title}</h3>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">服务内容：</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="size-3 text-gray-500" />
                              <span className="text-xs text-gray-600 dark:text-gray-400">{feature}</span>
                            </div>
                          ))}
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

      {/* 成功案例 */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">成功案例</h2>
            <p className="text-gray-600 dark:text-gray-400">优秀毕业生就业典型案例</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
            {successCases.map((case_, index) => (
              <motion.div
                key={case_.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardBody className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                      <div className="lg:col-span-1">
                        <div className="text-center lg:text-left">
                          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center mx-auto lg:mx-0 mb-3">
                            <Star className="size-8 text-gray-600 dark:text-gray-400" />
                          </div>
                          <h3 className="text-lg font-bold">{case_.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{case_.year}</p>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <BookOpen className="size-4 text-gray-500" />
                              <span className="text-sm font-medium">专业</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{case_.major}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Building2 className="size-4 text-gray-500" />
                              <span className="text-sm font-medium">公司</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{case_.company}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Briefcase className="size-4 text-gray-500" />
                              <span className="text-sm font-medium">职位</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{case_.position}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <DollarSign className="size-4 text-gray-500" />
                              <span className="text-sm font-medium">薪资</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{case_.salary}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                          {case_.story}
                        </p>
                      </div>

                      <div className="lg:col-span-1 text-center lg:text-right">
                        <Button
                          variant="light"
                          size="sm"
                          endContent={<ArrowRight className="size-4" />}
                        >
                          了解更多
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">就业咨询</h2>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              如果您对就业服务有任何疑问，或需要了解更多就业信息，欢迎联系我们
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardBody className="p-6 text-center">
                  <Phone className="size-6 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">就业热线</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">0912-4212345</p>
                </CardBody>
              </Card>

              <Card>
                <CardBody className="p-6 text-center">
                  <Mail className="size-6 text-gray-600 dark:text-gray-400 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">就业邮箱</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">jobs@dbzj.edu.cn</p>
                </CardBody>
              </Card>
            </div>

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
                href="/about"
                variant="bordered"
                size="lg"
              >
                了解学校
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


