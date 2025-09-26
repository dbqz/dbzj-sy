import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 创建管理员用户
  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@dbzj.edu.cn" },
    update: {},
    create: {
      email: "admin@dbzj.edu.cn",
      passwordHash: "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJByJp8Y2nIvhRVpCe", // "password"
      name: "系统管理员",
    },
  });

  // 创建示例新闻
  const newsData = [
    {
      title: "定边职教中心2025年春季招生简章发布",
      slug: "2025-spring-enrollment",
      content: `
        <h2>招生专业</h2>
        <p>我校2025年春季招生专业包括：</p>
        <ul>
          <li>数控机床技术</li>
          <li>电子电工技术</li>
          <li>机械加工技术</li>
          <li>服装加工技术</li>
          <li>酒店服务管理</li>
          <li>电气焊技术</li>
        </ul>
        <h2>报名条件</h2>
        <p>具有初中及以上学历，身体健康，品行端正的应往届毕业生均可报名。</p>
        <h2>报名时间</h2>
        <p>即日起至2025年3月31日</p>
        <h2>联系方式</h2>
        <p>招生办电话：0912-4212345</p>
      `,
      publishedAt: new Date("2025-01-15"),
    },
    {
      title: "校园实训车间设备全面升级完成",
      slug: "workshop-equipment-upgrade",
      content: `
        <h2>设备升级概况</h2>
        <p>经过三个月的紧张施工，我校6个实训车间的设备升级工作已全面完成。</p>
        <h2>升级内容</h2>
        <ul>
          <li>数控机床车间：新增5台高精度数控车床</li>
          <li>机械加工车间：更新传统车床和铣床</li>
          <li>电气焊车间：配备现代化焊接设备</li>
          <li>服装加工车间：引进智能裁剪设备</li>
          <li>计算机实验室：更新教学用机</li>
        </ul>
        <h2>教学效果</h2>
        <p>新设备的投入使用将显著提升学生的实践操作能力，为培养高素质技能人才提供有力保障。</p>
      `,
      publishedAt: new Date("2025-01-10"),
    },
    {
      title: "与榆林师范学校联合办学签约仪式成功举行",
      slug: "cooperation-signing-ceremony",
      content: `
        <h2>签约仪式</h2>
        <p>1月8日，我校与榆林师范学校联合办学签约仪式在榆林师范学校举行。</p>
        <h2>合作内容</h2>
        <p>双方将在以下领域开展深度合作：</p>
        <ul>
          <li>师资培训与交流</li>
          <li>课程资源共享</li>
          <li>学生实习实训</li>
          <li>教学改革研究</li>
        </ul>
        <h2>合作意义</h2>
        <p>此次合作将进一步提升我校的办学水平，为学生提供更优质的教育资源。</p>
      `,
      publishedAt: new Date("2025-01-08"),
    },
    {
      title: "2024年度优秀学生表彰大会圆满结束",
      slug: "2024-excellent-students-award",
      content: `
        <h2>表彰大会</h2>
        <p>12月28日，我校2024年度优秀学生表彰大会在学术报告厅隆重举行。</p>
        <h2>表彰项目</h2>
        <ul>
          <li>三好学生：50名</li>
          <li>优秀学生干部：30名</li>
          <li>技能竞赛获奖者：20名</li>
          <li>社会实践先进个人：15名</li>
        </ul>
        <h2>校长寄语</h2>
        <p>校长在讲话中勉励全体学生以获奖同学为榜样，勤奋学习，全面发展，成为德技并修的高素质技能人才。</p>
      `,
      publishedAt: new Date("2024-12-28"),
    },
    {
      title: "校园文化艺术节精彩纷呈",
      slug: "campus-culture-art-festival",
      content: `
        <h2>艺术节概况</h2>
        <p>为期一周的校园文化艺术节于12月20日圆满落幕，各项活动精彩纷呈。</p>
        <h2>主要活动</h2>
        <ul>
          <li>文艺汇演：各班级精心准备的歌舞、相声、小品等节目</li>
          <li>书画展览：师生书画作品展示</li>
          <li>技能展示：各专业学生技能操作演示</li>
          <li>体育竞赛：篮球、乒乓球、拔河等比赛</li>
        </ul>
        <h2>活动意义</h2>
        <p>艺术节丰富了校园文化生活，展示了学生的才艺和技能，营造了积极向上的校园氛围。</p>
      `,
      publishedAt: new Date("2024-12-20"),
    },
  ];

  for (const newsItem of newsData) {
    await prisma.news.upsert({
      where: { slug: newsItem.slug },
      update: {},
      create: {
        ...newsItem,
        authorId: admin.id,
      },
    });
  }

  // 创建校园媒体资源
  const campusMediaData = [
    // 校园英雄背景图
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d013d71378c.jpg",
      type: "image",
      title: "校园全貌",
      description: "定边职教中心300亩校园全景鸟瞰图，展现学校宏伟规模和优美环境",
      category: "hero",
    },
    // 校园建筑
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d013838d22c.png",
      type: "image",
      title: "教学楼",
      description: "现代化的教学楼，配备先进的多媒体教室和实验设备",
      category: "buildings",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e8c07ed.png",
      type: "image",
      title: "办公楼",
      description: "学校行政办公中心，为师生提供各类服务",
      category: "buildings",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e8c238e.png",
      type: "image",
      title: "音乐楼",
      description: "专业的音乐教学楼，为艺术类专业提供优质的教学环境",
      category: "buildings",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d013840247d.png",
      type: "image",
      title: "学生宿舍",
      description: "舒适的学生宿舍，为学生提供良好的生活环境",
      category: "buildings",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png",
      type: "image",
      title: "实训中心",
      description: "现代化的实训中心，配备各类专业实训设备",
      category: "buildings",
    },
    // 实训车间 - 为每个车间创建唯一的URL（添加查询参数区分）
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png?workshop=cnc",
      type: "image",
      title: "数控机床实训车间",
      description: "配备先进的数控车床、铣床等设备，培养学生精密加工技能",
      category: "workshops",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png?workshop=mechanical",
      type: "image",
      title: "机械加工实训车间",
      description: "传统机械加工设备齐全，基础技能训练的重要场所",
      category: "workshops",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png?workshop=welding",
      type: "image",
      title: "电气焊实训车间",
      description: "现代化焊接设备，培养学生焊接技术和安全操作能力",
      category: "workshops",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png?workshop=garment",
      type: "image",
      title: "服装加工实训车间",
      description: "专业服装制作设备，培养学生服装设计与制作技能",
      category: "workshops",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png?workshop=computer",
      type: "image",
      title: "计算机实训室",
      description: "配备最新计算机设备，支持多种软件教学和实训",
      category: "workshops",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png?workshop=electronics",
      type: "image",
      title: "电子电工实训室",
      description: "电子技术和电工技术实训的专业场所",
      category: "workshops",
    },
    // 校园活动 - 为重复的URL添加查询参数区分
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e981202.png?activity=competition",
      type: "image",
      title: "技能竞赛",
      description: "学生在实训中心参加各类技能竞赛，展示专业技能水平",
      category: "activities",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e8c238e.png?activity=performance",
      type: "image",
      title: "文艺汇演",
      description: "在音乐楼举办丰富多彩的校园文化活动，展现学生才艺",
      category: "activities",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e8e4373.png?activity=sports",
      type: "image",
      title: "体育活动",
      description: "学生在篮球排球场进行各类体育运动和比赛",
      category: "activities",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e9ecdd1.png?activity=reading",
      type: "image",
      title: "读书活动",
      description: "学生在读书廊进行阅读学习活动",
      category: "activities",
    },
    // 校园设施 - 为重复的URL添加查询参数区分
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e9ecdd1.png?facility=library",
      type: "image",
      title: "读书廊",
      description: "优雅的读书环境，为师生提供安静的学习空间",
      category: "facilities",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d01383c0a16.png",
      type: "image",
      title: "操场",
      description: "标准化体育场地，支持各类体育活动和比赛",
      category: "facilities",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d012e8e4373.png?facility=courts",
      type: "image",
      title: "篮球排球场",
      description: "专业的球类运动场地，丰富学生的体育活动",
      category: "facilities",
    },
    {
      url: "https://youke1.picui.cn/s1/2025/09/21/68d01383cf630.png",
      type: "image",
      title: "学生食堂",
      description: "干净卫生的学生食堂，提供营养丰富的餐食",
      category: "facilities",
    },
    // 校园视频
    {
      url: "/videos/school-intro.mp4",
      type: "video",
      title: "学校宣传片",
      description: "全面展示学校办学特色和教学成果",
      category: "videos",
      thumbnailUrl: "/images/campus/video-thumb-1.jpg",
      duration: "5:30",
    },
    {
      url: "/videos/training-demo.mp4",
      type: "video",
      title: "实训教学展示",
      description: "学生在各实训车间的学习实践场景",
      category: "videos",
      thumbnailUrl: "/images/campus/video-thumb-2.jpg",
      duration: "3:45",
    },
    {
      url: "/videos/campus-life.mp4",
      type: "video",
      title: "校园生活纪录",
      description: "记录学生丰富多彩的校园生活",
      category: "videos",
      thumbnailUrl: "/images/campus/video-thumb-3.jpg",
      duration: "4:20",
    },
  ];

  // 先删除现有的校园媒体资源，避免重复
  await prisma.mediaAsset.deleteMany({
    where: {
      category: {
        in: ['hero', 'buildings', 'workshops', 'activities', 'facilities', 'videos']
      }
    }
  });

  // 创建新的校园媒体资源
  for (const mediaItem of campusMediaData) {
    await prisma.mediaAsset.create({
      data: mediaItem,
    });
  }

  console.log("种子数据创建完成！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
