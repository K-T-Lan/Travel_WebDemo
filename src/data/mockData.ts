import { Destination, Hotel, TransportTicket, PromoCode, Booking, UserProfile } from '../types';

export const POPULAR_DESTINATIONS: Destination[] = [
  {
    id: 'hoi-an',
    name: 'Hội An',
    location: 'Quảng Nam, Việt Nam',
    region: 'Trung',
    regionLabel: 'MIỀN TRUNG',
    tagline: 'Phố cổ đèn lồng bên sông Hoài',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Di sản thế giới UNESCO lưu giữ vẻ đẹp hoài cổ của phố lồng đèn, Chùa Cầu và dòng sông Hoài thơ mộng thả hoa đăng.',
    longDescription: 'Phố cổ Hội An từng là thương cảng sầm uất thế kỷ 16-17. Đến với Hội An, bạn sẽ lạc bước giữa những dãy nhà sơn vàng phủ rêu phong, mái ngói âm dương trầm mặc, ánh đèn lồng rực rỡ và nền ẩm thực đường phố ngon nức tiếng.',
    rating: 4.88,
    reviewsCount: 2100,
    priceFrom: 1890000,
    bestTimeToVisit: 'Tháng 2 - Tháng 8',
    weather: {
      temp: '28°C',
      condition: 'Nắng nhẹ, hoàng hôn êm',
      humidity: '75%'
    },
    highlights: [
      'Đi dạo phố cổ lung linh ánh lồng đèn về đêm',
      'Thả hoa đăng cầu bình an trên dòng sông Hoài',
      'Check-in Chùa Cầu biểu tượng hơn 400 năm tuổi',
      'Trải nghiệm chèo thuyền thúng Rừng dừa Bảy Mẫu',
      'Đạp xe qua làng gốm Thanh Hà & làng rau Trà Quế'
    ],
    famousFoods: ['Cao Lầu Hội An', 'Cơm gà Bà Buội', 'Bánh mì Phượng', 'Bánh đập hến xào', 'Nước Mót thảo mộc'],
    tags: ['Phố cổ', 'Lồng đèn', 'Ẩm thực đường phố', 'Di sản UNESCO'],
    featured: true
  },
  {
    id: 'sapa',
    name: 'Sa Pa',
    location: 'Lào Cai, Việt Nam',
    region: 'Bắc',
    regionLabel: 'MIỀN BẮC',
    tagline: 'Ruộng bậc thang trong sương sớm',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Xứ sở sương mù quyến rũ với đỉnh Fansipan 3.143m, thung lũng Mường Hoa và những thửa ruộng bậc thang kỳ vĩ.',
    longDescription: 'Nằm ở độ cao 1.600m so với mực nước biển, Sa Pa mang khí hậu mát mẻ quanh năm cùng cảnh sắc thiên nhiên hùng vĩ. Nơi đây hội tụ văn hóa đặc sắc của đồng bào dân tộc H’Mông, Dao đỏ, Tày và đỉnh Fansipan được mệnh danh là Nóc nhà Đông Dương.',
    rating: 4.9,
    reviewsCount: 1650,
    priceFrom: 2250000,
    bestTimeToVisit: 'Tháng 9 - Tháng 11 & Tháng 12 - Tháng 2',
    weather: {
      temp: '18°C',
      condition: 'Sương mù nhẹ, se lạnh',
      humidity: '82%'
    },
    highlights: [
      'Chinh phục đỉnh Fansipan 3.143m ngắm biển mây',
      'Bản Cát Cát xinh xắn & Thung lũng Mường Hoa',
      'Đèo Ô Quy Hồ - Một trong tứ đại đỉnh đèo Tây Bắc',
      'Nhà thờ đá cổ kính trung tâm thị xã',
      'Tắm lá thuốc người Dao đỏ thư giãn hồi phục sức khỏe'
    ],
    famousFoods: ['Thịt lợn cắp nách nướng', 'Lẩu cá hồi & cá tầm Sa Pa', 'Thắng cố ngựa Mường Khương', 'Cải mèo xào tỏi', 'Cơm lam nướng'],
    tags: ['Săn mây', 'Fansipan', 'Ruộng bậc thang', 'Tây Bắc'],
    featured: true
  },
  {
    id: 'da-nang',
    name: 'Đà Nẵng',
    location: 'Miền Trung, Việt Nam',
    region: 'Trung',
    regionLabel: 'MIỀN TRUNG',
    tagline: 'Biển dài, cầu đẹp, thành phố năng động',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Thành phố biển đáng sống nhất Việt Nam với Cầu Vàng Bà Nà Hills, bán đảo Sơn Trà và biển Mỹ Khê cát trắng mịn.',
    longDescription: 'Đà Nẵng sở hữu vị trí đắc địa kề biển kề núi, là tâm điểm của 3 di sản văn hóa thế giới (Cố đô Huế, Phố cổ Hội An và Thánh địa Mỹ Sơn). Đến đây du khách được chiêm ngưỡng Cầu Rồng phun lửa, đắm mình trong làn nước biển Mỹ Khê trong xanh và thưởng thức hải sản tươi ngon bậc nhất.',
    rating: 4.9,
    reviewsCount: 1420,
    priceFrom: 1590000,
    bestTimeToVisit: 'Tháng 3 - Tháng 9',
    weather: {
      temp: '29°C',
      condition: 'Nắng ấm, biển êm',
      humidity: '72%'
    },
    highlights: [
      'Cầu Vàng & Cáp treo Bà Nà Hills kỷ lục Guinness',
      'Biển Mỹ Khê - Top bãi biển đẹp nhất hành tinh (Forbes)',
      'Bán đảo Sơn Trà & Chùa Linh Ứng tượng Phật 67m',
      'Ngũ Hành Sơn huyền ảo với hang động kỳ vĩ',
      'Cầu Rồng phun lửa & phun nước vào mỗi cuối tuần'
    ],
    famousFoods: ['Mì Quảng ếch', 'Bánh tráng cuốn thịt heo hai đầu da', 'Bún chả cá Đà Nẵng', 'Gỏi cá Nam Ô', 'Bánh xèo nem lụi'],
    tags: ['Biển Mỹ Khê', 'Bà Nà Hills', 'Hải sản', 'Check-in Cầu Vàng'],
    featured: true
  },
  {
    id: 'phu-quoc',
    name: 'Phú Quốc',
    location: 'Kiên Giang, Việt Nam',
    region: 'Nam',
    regionLabel: 'MIỀN NAM',
    tagline: 'Đảo ngọc với nước biển trong xanh',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Đảo Ngọc thiên đường với bãi Sao cát mịn như kem, hoàng hôn rực rỡ tại Sunset Sanato và Grand World không ngủ.',
    longDescription: 'Phú Quốc là hòn đảo lớn nhất Việt Nam, được mệnh danh là Đảo Ngọc với những bãi biển hoang sơ tuyệt mỹ, các khu resort 5 sao quốc tế và tổ hợp giải trí đẳng cấp thế giới như VinWonders, Safari bán hoang dã và cáp treo vượt biển Hòn Thơm.',
    rating: 4.8,
    reviewsCount: 1890,
    priceFrom: 2790000,
    bestTimeToVisit: 'Tháng 10 - Tháng 4',
    weather: {
      temp: '30°C',
      condition: 'Nắng đẹp, gió mát',
      humidity: '68%'
    },
    highlights: [
      'Bãi Sao & Bãi Khem với dải cát trắng mịn',
      'Cáp treo Hòn Thơm vượt biển dài nhất thế giới',
      'Vinpearl Safari vườn thú mở lớn nhất Đông Nam Á',
      'Grand World - Thành phố không ngủ phong cách Venice',
      'Tour 4 đảo lặn ngắm san hô và chèo SUP chụp ảnh flycam'
    ],
    famousFoods: ['Gỏi cá trích Phú Quốc', 'Bún quậy Kiến Xây', 'Nhum biển nướng mỡ hành', 'Ghẹ Hàm Ninh', 'Tiêu chín Phú Quốc'],
    tags: ['Đảo Ngọc', 'Lặn san hô', 'Resort sang trọng', 'Hoàng hôn'],
    featured: true
  },
  {
    id: 'ha-giang',
    name: 'Hà Giang',
    location: 'Đông Bắc, Việt Nam',
    region: 'Bắc',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Vùng cao nguyên đá Đồng Văn hùng vĩ, hẻm vực Tu Sản sâu nhất Đông Nam Á và cung đường đèo Mã Pí Lèng huyền thoại.',
    longDescription: 'Hà Giang là điểm đến mơ ước của những tâm hồn đam mê xê dịch. Khung cảnh non nước trùng điệp của Cao nguyên đá Đồng Văn, dòng sông Nho Quế xanh ngọc bích uốn lượn dưới hẻm Tu Sản và hoa tam giác mạch mùa thu tạo nên bức tranh thiên nhiên kiệt tác.',
    rating: 4.95,
    reviewsCount: 1120,
    priceFrom: 1600000,
    bestTimeToVisit: 'Tháng 10 - Tháng 12 (Mùa hoa tam giác mạch)',
    weather: {
      temp: '20°C',
      condition: 'Trời quang đãng, gió lộng',
      humidity: '65%'
    },
    highlights: [
      'Đèo Mã Pí Lèng ngắm trọn hẻm Tu Sản kỳ vĩ',
      'Du thuyền trên sông Nho Quế nước xanh màu ngọc',
      'Cột cờ Lũng Cú - Điểm cực Bắc địa đầu Tổ quốc',
      'Dinh thự Vua Mèo Vương Chính Đức cổ kính',
      'Phố cổ Đồng Văn đậm đà văn hóa chợ phiên'
    ],
    famousFoods: ['Bánh tam giác mạch', 'Thắng dền nóng hổi', 'Cháo ấu tẩu bổ dưỡng', 'Thịt trâu gác bếp', 'Phở chua Đồng Văn'],
    tags: ['Sông Nho Quế', 'Mã Pí Lèng', 'Cao nguyên đá', 'Phượt xe máy'],
    featured: true
  },
  {
    id: 'hoi-an',
    name: 'Hội An',
    location: 'Quảng Nam, Việt Nam',
    region: 'Trung',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Di sản thế giới UNESCO lưu giữ vẻ đẹp hoài cổ của phố lồng đèn, Chùa Cầu và dòng sông Hoài thơ mộng thả hoa đăng.',
    longDescription: 'Phố cổ Hội An từng là thương cảng sầm uất thế kỷ 16-17. Đến với Hội An, bạn sẽ lạc bước giữa những dãy nhà sơn vàng phủ rêu phong, mái ngói âm dương trầm mặc, ánh đèn lồng rực rỡ và nền ẩm thực đường phố ngon nức tiếng.',
    rating: 4.88,
    reviewsCount: 2100,
    priceFrom: 1200000,
    bestTimeToVisit: 'Tháng 2 - Tháng 8',
    weather: {
      temp: '28°C',
      condition: 'Nắng nhẹ, hoàng hôn êm',
      humidity: '75%'
    },
    highlights: [
      'Đi dạo phố cổ lung linh ánh lồng đèn về đêm',
      'Thả hoa đăng cầu bình an trên dòng sông Hoài',
      'Check-in Chùa Cầu biểu tượng hơn 400 năm tuổi',
      'Trải nghiệm chèo thuyền thúng Rừng dừa Bảy Mẫu',
      'Đạp xe qua làng gốm Thanh Hà & làng rau Trà Quế'
    ],
    famousFoods: ['Cao Lầu Hội An', 'Cơm gà Bà Buội', 'Bánh mì Phượng', 'Bánh đập hến xào', 'Nước Mót thảo mộc'],
    tags: ['Phố cổ', 'Lồng đèn', 'Ẩm thực đường phố', 'Di sản UNESCO']
  },
  {
    id: 'ninh-binh',
    name: 'Ninh Bình',
    location: 'Đồng bằng Bắc Bộ, Việt Nam',
    region: 'Bắc',
    category: 'culture',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Vịnh Hạ Long trên cạn với quần thể Tràng An di sản kép thế giới, Tam Cốc Bích Động và Hang Múa ngắm toàn cảnh non nước.',
    longDescription: 'Ninh Bình là vùng đất Cố đô ngàn năm với cảnh quan karst đá vôi ngập nước độc nhất vô nhị. Chèo thuyền len lỏi qua các hang động ngập nước, leo 500 bậc đá đỉnh Ngọa Long ngắm lúa chín Tam Cốc là trải nghiệm khó quên.',
    rating: 4.85,
    reviewsCount: 1340,
    priceFrom: 1100000,
    bestTimeToVisit: 'Tháng 5 - Tháng 6 (mùa lúa chín) & Tháng 1 - Tháng 3 (lễ hội)',
    weather: {
      temp: '27°C',
      condition: 'Trời trong xanh',
      humidity: '70%'
    },
    highlights: [
      'Chèo thuyền khám phá Quần thể danh thắng Tràng An',
      'Leo 500 bậc đá Hang Múa ngắm toàn cảnh sông Ngô Đồng',
      'Chiêm bái Chùa Bái Đính ngôi chùa lớn nhất Việt Nam',
      'Khu bảo tồn thiên nhiên Đầm Vân Long săn voọc mông trắng'
    ],
    famousFoods: ['Thịt dê núi Ninh Bình', 'Cơm cháy sốt ruốc giòn rụm', 'Ốc núi hấp gừng', 'Xôi trứng kiến Nho Quan'],
    tags: ['Tràng An', 'Hang Múa', 'Di sản kép', 'Chèo thuyền']
  },
  {
    id: 'da-lat',
    name: 'Đà Lạt',
    location: 'Lâm Đồng, Việt Nam',
    region: 'Trung',
    category: 'mountain',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Thành phố ngàn hoa mộng mơ với hồ Xuân Hương, rừng thông bạt ngàn, không khí se lạnh và hàng trăm quán cafe chill.',
    longDescription: 'Đà Lạt mang vẻ đẹp thanh bình lãng mạn của vùng đất cao nguyên ôn đới. Khí hậu mát lạnh bốn mùa, những biệt thự Pháp cổ kính nép mình dưới rặng thông và văn hóa thưởng thức cafe ngắm mây khiến nơi đây luôn là điểm đến chữa lành lý tưởng.',
    rating: 4.87,
    reviewsCount: 2450,
    priceFrom: 1350000,
    bestTimeToVisit: 'Tháng 11 - Tháng 4 (Mùa hoa mai anh đào, dã quỳ)',
    weather: {
      temp: '17°C',
      condition: 'Mát lạnh dễ chịu, sương sớm',
      humidity: '78%'
    },
    highlights: [
      'Dạo quanh Hồ Xuân Hương và Quảng trường Lâm Viên',
      'Săn mây tại đồi chè Cầu Đất lúc bình minh',
      'Check-in Thung Lũng Tình Yêu & Vườn hoa cẩm tú cầu',
      'Khám phá Ga Đà Lạt cổ kính phong cách kiến trúc Pháp',
      'Thưởng thức bánh tráng nướng & sữa đậu nành chợ đêm'
    ],
    famousFoods: ['Bánh tráng nướng Đà Lạt', 'Lẩu gà lá é Tao Ngộ', 'Lẩu bò Ba Toa', 'Bánh ướt lòng gà', 'Kem bơ Thanh Thảo'],
    tags: ['Thành phố hoa', 'Săn mây Cầu Đất', 'Cafe chill', 'Khí hậu mát mẻ']
  },
  {
    id: 'nha-trang',
    name: 'Nha Trang',
    location: 'Khánh Hòa, Việt Nam',
    region: 'Trung',
    category: 'beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Vịnh biển đẹp top thế giới với VinWonders Hòn Tre, tắm bùn khoáng nóng và các tour lặn ngắm san hô Hòn Mun kỳ thú.',
    longDescription: 'Nha Trang nổi tiếng với vịnh biển xanh ngọc, bờ cát trải dài dọc đại lộ Trần Phú rợp bóng dừa. Nơi đây có cơ sở hạ tầng du lịch phát triển vượt trội, kết hợp hài hòa giữa nghỉ dưỡng tắm biển và vui chơi giải trí cao cấp.',
    rating: 4.82,
    reviewsCount: 1530,
    priceFrom: 1750000,
    bestTimeToVisit: 'Tháng 1 - Tháng 8',
    weather: {
      temp: '31°C',
      condition: 'Nắng vàng biển xanh',
      humidity: '66%'
    },
    highlights: [
      'Khu vui chơi giải trí đỉnh cao VinWonders Hòn Tre',
      'Khu bảo tồn biển Hòn Mun với rạn san hô phong phú',
      'Tắm bùn khoáng tự nhiên I-Resort & Tháp Bà Ponagar',
      'Tháp Bà Ponagar kiến trúc Chăm Pa cổ kính 1.200 năm'
    ],
    famousFoods: ['Bún sứa Nha Trang', 'Bánh căn mực trứng', 'Nem nướng Ninh Hòa Đặng Văn Quyên', 'Bò nướng Lạc Cảnh'],
    tags: ['Vịnh biển đẹp', 'Tắm bùn khoáng', 'VinWonders', 'Lặn biển']
  },
  {
    id: 'bangkok',
    name: 'Bangkok',
    location: 'Thái Lan',
    region: 'Quốc tế',
    category: 'city',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1000&q=80'],
    description: 'Thủ đô sôi động của xứ Chùa Vàng với cung điện Hoàng Gia lộng lẫy, chợ đêm Chatuchak và ẩm thực đường phố Michelin.',
    longDescription: 'Bangkok kết hợp hài hòa giữa các ngôi chùa Phật giáo vàng son cổ kính, trung tâm mua sắm sầm uất và đời sống ẩm thực đêm náo nhiệt dọc bờ sông Chao Phraya.',
    rating: 4.89,
    reviewsCount: 3100,
    priceFrom: 3990000,
    bestTimeToVisit: 'Tháng 11 - Tháng 2',
    weather: {
      temp: '32°C',
      condition: 'Nắng ấm',
      humidity: '65%'
    },
    highlights: [
      'Cung điện Grand Palace & Chùa Phật Ngọc Wat Phra Kaew',
      'Ngắm hoàng hôn Wat Arun bên bờ sông Chao Phraya',
      'Thiên đường mua sắm Siam Paragon, ICONSIAM',
      'Chợ đêm Jodd Fairs với món sườn cay khổng lồ'
    ],
    famousFoods: ['Pad Thai Thip Samai', 'Tom Yum Goong chua cay', 'Xôi xoài dừa béo ngậy', 'Sườn cay núi lửa Laeng Saeb'],
    tags: ['Chùa Vàng', 'Shopping', 'Chợ đêm', 'Ẩm thực Thái']
  },
  {
    id: 'bali',
    name: 'Bali',
    location: 'Indonesia',
    region: 'Quốc tế',
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80'],
    description: 'Hòn đảo thiên đường nhiệt đới với ruộng bậc thang Ubud, đền Uluwatu trên vách đá và những khu resort villa hồ bơi vô cực.',
    longDescription: 'Bali được thế giới tôn vinh là Đảo của các vị thần. Nơi đây sở hữu nền văn hóa Hindu độc đáo, sóng biển lướt ván đẳng cấp tại Canggu/Kuta và sự tĩnh lặng tâm linh ở rừng già Ubud.',
    rating: 4.92,
    reviewsCount: 2780,
    priceFrom: 6500000,
    bestTimeToVisit: 'Tháng 4 - Tháng 10',
    weather: {
      temp: '29°C',
      condition: 'Nắng nhiệt đới mát mẻ',
      humidity: '70%'
    },
    highlights: [
      'Đền Uluwatu xem điệu múa Kecak lúc hoàng hôn',
      'Xích đu Bali Swing giữa rừng nhiệt đới Ubud',
      'Ruộng bậc thang Tegalalang xanh mướt',
      'Cổng trời Lempuyang ngắm núi lửa Agung hùng vĩ'
    ],
    famousFoods: ['Babi Guling heo quay giòn da', 'Nasi Goreng cơm chiên Indonesia', 'Sate Lilit xiêng nướng', 'Nước dừa tươi Bali'],
    tags: ['Resort vô cực', 'Ubud', 'Đền cổ', 'Hoàng hôn biển']
  }
];

export const MOCK_HOTELS: Hotel[] = [
  {
    id: 'hotel-danang-intercon',
    name: 'InterContinental Danang Sun Peninsula Resort',
    city: 'Đà Nẵng',
    address: 'Bãi Bắc, Bán đảo Sơn Trà, TP. Đà Nẵng',
    rating: 4.96,
    starRating: 5,
    reviewsCount: 840,
    pricePerNight: 7850000,
    originalPrice: 9500000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Tuyệt tác kiến trúc của kiến trúc sư lừng danh Bill Bensley nép mình bên sườn đồi bán đảo Sơn Trà, hướng trọn tầm nhìn ra vịnh biển riêng tư.',
    locationTag: 'Bán đảo Sơn Trà, Đà Nẵng',
    distanceToCenter: 'Cách trung tâm 13km',
    amenities: [
      'Bãi biển riêng tư',
      'Hồ bơi vô cực trên cao',
      'Nhà hàng sao Michelin La Maison 1888',
      'Miễn phí bữa sáng Buffet cao cấp',
      'Spa Harnn Heritage đoạt giải quốc tế',
      'Xe đưa đón sân bay miễn phí',
      'Wifi tốc độ cao'
    ],
    roomTypes: [
      {
        id: 'room-ic-resort-classic',
        name: 'Resort Classic King Ocean View',
        pricePerNight: 7850000,
        originalPrice: 9500000,
        capacity: '2 Người lớn + 1 Trẻ em',
        bedType: '1 Giường King lớn',
        area: '70 m²',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        perks: ['View biển 180 độ', 'Ban công riêng biệt', 'Bao gồm bữa sáng', 'Bồn tắm nhìn ra biển'],
        availableRooms: 4
      },
      {
        id: 'room-ic-terrace-suite',
        name: 'Son Tra Terrace Suite',
        pricePerNight: 11200000,
        originalPrice: 13500000,
        capacity: '2-3 Khách',
        bedType: '1 Giường Super King',
        area: '84 m²',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
        perks: ['Đặc quyền Club Lounge', 'Rượu vang & trái cây chào đón', 'Bao gồm ăn sáng & trà chiều', 'Xe đưa đón VIP'],
        availableRooms: 2
      },
      {
        id: 'room-ic-villa-pool',
        name: 'Biệt Thự 1 Phòng Ngủ Hồ Bơi Riêng Bên Biển',
        pricePerNight: 19800000,
        originalPrice: 24000000,
        capacity: '2 Người lớn + 2 Trẻ em',
        bedType: '1 King Bed + Sofa Bed',
        area: '145 m²',
        image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
        perks: ['Hồ bơi riêng sát biển', 'Quản gia phục vụ 24/7', 'Bữa sáng phục vụ tại villa', 'Miễn phí liệu trình Spa 60p'],
        availableRooms: 1
      }
    ]
  },
  {
    id: 'hotel-phuquoc-vinpearl',
    name: 'Vinpearl Resort & Spa Phú Quốc',
    city: 'Phú Quốc',
    address: 'Bãi Dài, Xã Gành Dầu, TP. Phú Quốc',
    rating: 4.88,
    starRating: 5,
    reviewsCount: 1210,
    pricePerNight: 2650000,
    originalPrice: 3400000,
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Resort nghỉ dưỡng phong cách Indochine tráng lệ bên Bãi Dài cát vàng, liền kề VinWonders & Safari, hồ bơi rộng gần 5.000m².',
    locationTag: 'Bãi Dài, Phú Quốc',
    distanceToCenter: 'Kế bên Grand World',
    amenities: [
      'Hồ bơi ngoài trời 4.864 m²',
      'Miễn phí vé vui chơi Grand World xe bus',
      'Buffet sáng hải sản quốc tế',
      'Khu vui chơi trẻ em Kid Club',
      'Akoya Spa trên mặt hồ yên bình',
      'Bãi tắm riêng bờ cát dài thoai thoải'
    ],
    roomTypes: [
      {
        id: 'room-vinpearl-deluxe-garden',
        name: 'Phòng Deluxe Hướng Vườn',
        pricePerNight: 2650000,
        originalPrice: 3400000,
        capacity: '2 Người lớn',
        bedType: '1 Giường King hoặc 2 Giường đơn',
        area: '46 m²',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        perks: ['Miễn phí bữa sáng', 'Hồ bơi & Gym miễn phí', 'Xe bus đưa đón sân bay theo lịch trình'],
        availableRooms: 8
      },
      {
        id: 'room-vinpearl-ocean-view',
        name: 'Phòng Deluxe Hướng Biển Tuyệt Đẹp',
        pricePerNight: 3250000,
        originalPrice: 4100000,
        capacity: '2 Người lớn + 1 Trẻ em',
        bedType: '1 Giường King',
        area: '52 m²',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
        perks: ['Ban công ngắm hoàng hôn', 'Buffet sáng phong phú', 'Nước uống & trái cây tươi chào mừng'],
        availableRooms: 5
      }
    ]
  },
  {
    id: 'hotel-sapa-topas',
    name: 'Topas Ecolodge Sa Pa',
    city: 'Sa Pa',
    address: 'Thôn Lếch Dao, Xã Thanh Bình, Sa Pa, Lào Cai',
    rating: 4.94,
    starRating: 5,
    reviewsCount: 920,
    pricePerNight: 4150000,
    originalPrice: 5200000,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Khu nghỉ dưỡng sinh thái được National Geographic bình chọn nằm trong top độc đáo nhất thế giới, hồ bơi nước ấm vô cực giữa thung lũng mây mờ.',
    locationTag: 'Bản Lếch Dao, Sa Pa',
    distanceToCenter: 'Cách trung tâm 18km (có xe shuttle)',
    amenities: [
      'Hồ bơi vô cực nước ấm 2 tầng view thung lũng',
      'Bungalow xây hoàn toàn bằng đá granit trắng',
      'Tắm lá thuốc thảo mộc người Dao đỏ',
      'Nhà hàng The Stilt House ẩm thực hữu cơ vùng cao',
      'Xe Limousine đưa đón Hà Nội - Sa Pa (có phụ thu)'
    ],
    roomTypes: [
      {
        id: 'room-topas-premium-bungalow',
        name: 'Premium Executive Bungalow',
        pricePerNight: 4150000,
        originalPrice: 5200000,
        capacity: '2 Khách',
        bedType: '1 Giường đôi lớn hoặc 2 Giường đơn',
        area: '38 m²',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        perks: ['Ban công ngắm thung lũng Mường Hoa', 'Buffet sáng hữu cơ', 'Sử dụng hồ bơi nước ấm không giới hạn'],
        availableRooms: 3
      }
    ]
  },
  {
    id: 'hotel-hoian-silksense',
    name: 'Silk Sense Hoi An River Resort',
    city: 'Hội An',
    address: 'Khu Đô Thị Cổ Cò, Cẩm An, Hội An, Quảng Nam',
    rating: 4.9,
    starRating: 5,
    reviewsCount: 680,
    pricePerNight: 1950000,
    originalPrice: 2500000,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80'],
    description: 'Resort ven sông Cổ Cò thanh bình, đạt chuẩn không rác thải nhựa, hồ bơi khoáng muối biển tốt cho sức khỏe và xe đạp dạo phố cổ miễn phí.',
    locationTag: 'Ven sông Cổ Cò, Bãi biển An Bàng',
    distanceToCenter: 'Cách phố cổ 4km',
    amenities: [
      'Hồ bơi nước khoáng muối biển vô cực',
      'Xe bus đưa đón phố cổ & bãi biển An Bàng miễn phí',
      'Miễn phí mượn xe đạp dạo đồng lúa',
      'Vườn rau hữu cơ cung cấp bữa ăn thuần tự nhiên',
      'Nuru Spa liệu trình thảo mộc bản địa'
    ],
    roomTypes: [
      {
        id: 'room-silk-deluxe-pool',
        name: 'Deluxe Room With Pool View',
        pricePerNight: 1950000,
        originalPrice: 2500000,
        capacity: '2 Người lớn',
        bedType: '1 Giường King',
        area: '42 m²',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        perks: ['Buffet sáng tươi ngon', 'Trà chiều miễn phí mỗi ngày', 'Xe đạp miễn phí'],
        availableRooms: 6
      }
    ]
  },
  {
    id: 'hotel-dalat-edensee',
    name: 'Dalat Edensee Lake Resort & Spa',
    city: 'Đà Lạt',
    address: 'Khu du lịch Hồ Tuyền Lâm, Phường 4, TP. Đà Lạt',
    rating: 4.86,
    starRating: 5,
    reviewsCount: 750,
    pricePerNight: 2350000,
    originalPrice: 2900000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    gallery: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80'],
    description: 'Biệt thự phong cách lâu đài Châu Âu ẩn mình giữa rừng thông cổ thụ, view trọn lòng hồ Tuyền Lâm phẳng lặng như gương.',
    locationTag: 'Hồ Tuyền Lâm, Đà Lạt',
    distanceToCenter: 'Cách chợ Đà Lạt 10km',
    amenities: [
      'Hồ bơi nước ấm trong nhà',
      'Chèo thuyền kayak trên hồ Tuyền Lâm',
      'Sân golf mini và bắn cung trong rừng',
      'Khu vui chơi bi-a & xem phim miễn phí',
      'Nhà hàng Riesling ẩm thực Âu - Á cao cấp'
    ],
    roomTypes: [
      {
        id: 'room-edensee-mimosa-deluxe',
        name: 'Mimosa Superior Mountain View',
        pricePerNight: 2350000,
        originalPrice: 2900000,
        capacity: '2 Khách',
        bedType: '1 Giường đôi hoặc 2 Giường đơn',
        area: '40 m²',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80',
        perks: ['Bao gồm bữa sáng phong phú', 'Miễn phí chèo thuyền kayak', 'Ban công thoáng mát'],
        availableRooms: 5
      }
    ]
  }
];

export const FEATURED_HOTELS = MOCK_HOTELS;

export const MOCK_TRANSPORTS: TransportTicket[] = [
  // Flights
  {
    id: 'fl-vna-han-dad',
    type: 'flight',
    provider: 'Vietnam Airlines',
    code: 'VN-165',
    fromCity: 'Hà Nội',
    fromLocation: 'Sân bay Nội Bài (HAN) - T1',
    toCity: 'Đà Nẵng',
    toLocation: 'Sân bay Quốc tế Đà Nẵng (DAD)',
    departureTime: '07:30',
    arrivalTime: '08:50',
    duration: '1h 20m',
    price: 1350000,
    originalPrice: 1750000,
    classType: 'Phổ thông tiêu chuẩn',
    baggageInfo: '23kg ký gửi + 12kg xách tay',
    amenities: ['Suất ăn nhẹ & nước uống', 'Ghế ngả êm ái', 'Báo chí & giải trí'],
    availableSeats: 14
  },
  {
    id: 'fl-vietjet-han-dad',
    type: 'flight',
    provider: 'Vietjet Air',
    code: 'VJ-509',
    fromCity: 'Hà Nội',
    fromLocation: 'Sân bay Nội Bài (HAN) - T1',
    toCity: 'Đà Nẵng',
    toLocation: 'Sân bay Quốc tế Đà Nẵng (DAD)',
    departureTime: '09:15',
    arrivalTime: '10:35',
    duration: '1h 20m',
    price: 890000,
    originalPrice: 1200000,
    classType: 'Eco Tiết Kiệm',
    baggageInfo: '7kg xách tay',
    amenities: ['Mua thêm hành lý giá ưu đãi', 'Check-in online nhanh chóng'],
    availableSeats: 22
  },
  {
    id: 'fl-bamboo-sgn-pqc',
    type: 'flight',
    provider: 'Bamboo Airways',
    code: 'QH-1521',
    fromCity: 'TP. Hồ Chí Minh',
    fromLocation: 'Sân bay Tân Sơn Nhất (SGN) - T1',
    toCity: 'Phú Quốc',
    toLocation: 'Sân bay Quốc tế Phú Quốc (PQC)',
    departureTime: '08:45',
    arrivalTime: '09:45',
    duration: '1h 00m',
    price: 1150000,
    originalPrice: 1550000,
    classType: 'Bamboo Plus',
    baggageInfo: '20kg ký gửi + 7kg xách tay',
    amenities: ['Phục vụ nước khoáng', 'Ghế da êm ái', 'Tích điểm Bamboo Club'],
    availableSeats: 9
  },
  {
    id: 'fl-vna-sgn-dad',
    type: 'flight',
    provider: 'Vietnam Airlines',
    code: 'VN-128',
    fromCity: 'TP. Hồ Chí Minh',
    fromLocation: 'Sân bay Tân Sơn Nhất (SGN)',
    toCity: 'Đà Nẵng',
    toLocation: 'Sân bay Đà Nẵng (DAD)',
    departureTime: '14:20',
    arrivalTime: '15:45',
    duration: '1h 25m',
    price: 1420000,
    originalPrice: 1800000,
    classType: 'Phổ thông linh hoạt',
    baggageInfo: '23kg ký gửi + 12kg xách tay',
    amenities: ['Suất ăn nóng', 'Miễn phí đổi vé', 'Hạng ghế thoải mái'],
    availableSeats: 16
  },
  // Limousine Bus
  {
    id: 'bus-sapa-express-han-sap',
    type: 'bus',
    provider: 'Sa Pa Express Limousine',
    code: 'SP-VIP01',
    fromCity: 'Hà Nội',
    fromLocation: '160 Trần Quang Khải, Hoàn Kiếm, HN',
    toCity: 'Sa Pa',
    toLocation: '06 Vườn Treo, Thị xã Sa Pa',
    departureTime: '06:45',
    arrivalTime: '12:30',
    duration: '5h 45m',
    price: 380000,
    originalPrice: 450000,
    classType: 'Limousine Cung Điện 22 Phòng VIP',
    baggageInfo: '20kg hành lý khoang dưới',
    amenities: ['Màn hình TV riêng kèm tai nghe', 'Cổng sạc USB & Type-C', 'Massage rung tự động', 'Nước khoáng & bánh ngọt', 'Wifi 5G tốc độ cao'],
    availableSeats: 6
  },
  {
    id: 'bus-futa-sgn-dalat',
    type: 'bus',
    provider: 'Phương Trang (FUTA Bus Lines)',
    code: 'FUTA-DL88',
    fromCity: 'TP. Hồ Chí Minh',
    fromLocation: 'Bến xe Miền Tây / Lê Hồng Phong Q.5',
    toCity: 'Đà Lạt',
    toLocation: 'Bến xe Liên tỉnh Đà Lạt (Có trung chuyển)',
    departureTime: '23:00',
    arrivalTime: '05:30',
    duration: '6h 30m',
    price: 310000,
    originalPrice: 350000,
    classType: 'Giường nằm Limousine 34 Phòng',
    baggageInfo: 'Hành lý thoải mái',
    amenities: ['Rèm che riêng tư', 'Cổng sạc điện thoại', 'Gối chăn sạch sẽ', 'Xe trung chuyển nội thành'],
    availableSeats: 11
  },
  {
    id: 'bus-hagiang-epic',
    type: 'bus',
    provider: 'Hà Giang Epic Limousine VIP',
    code: 'HG-VIP09',
    fromCity: 'Hà Nội',
    fromLocation: 'Phố Cổ Hà Nội / Bến xe Mỹ Đình',
    toCity: 'Hà Giang',
    toLocation: 'Thành phố Hà Giang (Đưa tận homestay)',
    departureTime: '21:30',
    arrivalTime: '04:00',
    duration: '6h 30m',
    price: 360000,
    originalPrice: 420000,
    classType: 'Cabin Đôi Hoàng Gia',
    baggageInfo: 'Hành lý khoang rộng',
    amenities: ['Rèm che cách âm', 'Nước suối khăn lạnh', 'Hỗ trợ thuê xe máy phượt trọn gói'],
    availableSeats: 8
  },
  // Train
  {
    id: 'train-se3-han-hue',
    type: 'train',
    provider: 'Đường Sắt Việt Nam (SE3 Tàu Nhanh)',
    code: 'Tàu SE3',
    fromCity: 'Hà Nội',
    fromLocation: 'Ga Hà Nội (120 Lê Duẩn)',
    toCity: 'Huế / Đà Nẵng',
    toLocation: 'Ga Huế / Ga Đà Nẵng',
    departureTime: '19:25',
    arrivalTime: '08:30',
    duration: '13h 05m',
    price: 790000,
    originalPrice: 920000,
    classType: 'Khoang 4 Giường Nằm Điều Hòa VIP',
    baggageInfo: '20kg xách tay',
    amenities: ['Phòng ngủ sạch sẽ có rèm che', 'Căng tin phục vụ ăn uống', 'Ngắm cảnh đèo Hải Vân kỳ vĩ lúc bình minh'],
    availableSeats: 12
  }
];

export const TRANSPORT_TICKETS = MOCK_TRANSPORTS;

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'VIETNAMOI',
    type: 'percent',
    value: 15,
    discountPercent: 15,
    maxDiscount: 500000,
    minSpend: 1000000,
    description: 'Giảm 15% tối đa 500k cho mọi đơn đặt phòng & vé',
    active: true,
    expiryDate: '31/12/2026'
  },
  {
    code: 'HE2026',
    type: 'percent',
    value: 20,
    discountPercent: 20,
    maxDiscount: 800000,
    minSpend: 2500000,
    description: 'Ưu đãi hè rực rỡ giảm 20% tối đa 800k cho tour & khách sạn biển',
    active: true,
    expiryDate: '30/09/2026'
  },
  {
    code: 'HOTEL300K',
    type: 'fixed',
    value: 300000,
    fixedDiscount: 300000,
    minSpend: 1500000,
    description: 'Giảm ngay 300.000đ trực tiếp khi đặt phòng từ 1.500.000đ',
    active: true,
    expiryDate: '31/12/2026'
  },
  {
    code: 'FIRSTTRIP',
    type: 'percent',
    value: 10,
    discountPercent: 10,
    maxDiscount: 300000,
    minSpend: 500000,
    description: 'Tặng 10% tối đa 300k cho khách hàng mới đăng ký',
    active: true,
    expiryDate: '31/12/2026'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'FLIGHT-VN2108',
    userId: 'usr_viet_traveler_01',
    type: 'flight',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    customerName: 'Nguyễn Hoàng Nam',
    customerEmail: 'hoangnam.travel@gmail.com',
    customerPhone: '0912 345 678',
    totalPrice: 1850000,
    paid: true,
    paymentMethod: 'VietQR Chuyển khoản',
    departureDate: '2026-06-15',
    quantity: 1,
    transportTicket: TRANSPORT_TICKETS[0]
  },
  {
    id: 'HOTEL-HA-9821',
    userId: 'usr_viet_traveler_01',
    type: 'hotel',
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    customerName: 'Nguyễn Hoàng Nam',
    customerEmail: 'hoangnam.travel@gmail.com',
    customerPhone: '0912 345 678',
    totalPrice: 3200000,
    paid: true,
    paymentMethod: 'Thẻ Visa Quốc tế',
    checkInDate: '2026-06-15',
    checkOutDate: '2026-06-17',
    quantity: 1,
    hotel: FEATURED_HOTELS[0],
    roomType: FEATURED_HOTELS[0]?.roomTypes[0]
  }
];

export const DEMO_USER_PROFILE: UserProfile = {
  id: 'usr_viet_traveler_01',
  fullName: 'Nguyễn Hoàng Nam',
  email: 'hoangnam.travel@gmail.com',
  phone: '0912 345 678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  savedDestinations: ['hoi-an', 'sapa', 'phu-quoc']
};

