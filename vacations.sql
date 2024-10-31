-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2024 at 05:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--

-- --------------------------------------------------------

--
-- Table structure for table `follower`
--

CREATE TABLE `follower` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `vacationId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follower`
--

INSERT INTO `follower` (`id`, `userId`, `vacationId`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 2, 4),
(4, 2, 5),
(5, 2, 8),
(6, 2, 12),
(7, 2, 15),
(8, 3, 1),
(9, 3, 3),
(10, 3, 4),
(11, 3, 7),
(12, 3, 15),
(13, 3, 9),
(14, 3, 10),
(15, 3, 6),
(16, 4, 8),
(17, 4, 2),
(18, 4, 5),
(19, 4, 15),
(20, 4, 7),
(21, 4, 3),
(22, 4, 4),
(23, 4, 11),
(24, 5, 3),
(25, 5, 6),
(26, 5, 9),
(27, 5, 12),
(28, 5, 14),
(29, 5, 16),
(30, 6, 1),
(31, 6, 7),
(32, 6, 4),
(33, 6, 2),
(34, 6, 3),
(35, 6, 13),
(36, 6, 14),
(37, 7, 3),
(38, 7, 1),
(39, 7, 5),
(40, 7, 6),
(41, 7, 7),
(42, 7, 8),
(43, 7, 11),
(44, 7, 12),
(45, 7, 16),
(46, 8, 1),
(47, 8, 8),
(48, 8, 9),
(49, 8, 10),
(50, 8, 11),
(51, 8, 12),
(52, 9, 3),
(53, 9, 6),
(54, 9, 12),
(55, 10, 11),
(56, 10, 6),
(57, 10, 1),
(58, 10, 12),
(63, 11, 13),
(64, 11, 17);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `firstName`, `lastName`, `email`, `password`, `isAdmin`, `token`) VALUES
(1, 'Ruti', 'Weingarten', 'ruti@gmail.com', '$2b$10$PjpssVLHKutB6oVk.VM3qeMLuE6yxUOd9lXe.v.zOoQzKYE6o4B9G', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6IlJ1dGkiLCJsYXN0TmFtZSI6IldlaW5nYXJ0ZW4iLCJlbWFpbCI6InJ1dGlAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI4ODA3MTQwfQ.5ZvXjsB4i0Zz9I-RUWpRiBKzqc_V5PQABxxEomQCQEo'),
(2, 'Jane', 'Smith', 'jane@gmail.com', '$2b$10$GO9V84NZwgR.VDEdSqlOquYpZuQWwG513s82ZGY9g9jw486oeG0NG', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImZpcnN0TmFtZSI6IkphbmUiLCJsYXN0TmFtZSI6IlNtaXRoIiwiZW1haWwiOiJqYW5lQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDYxNTN9.vsv1l1C34nTsz3GAo2j7xTaHzv09Z7BE16wC__kj8Q8'),
(3, 'Michael', 'Johnson', 'michael@gmail.com', '$2b$10$MHB/c0rWdLaqohdCjB2CXO6ll82g7ZKxXR28impToM.3KbRNJOoxG', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImZpcnN0TmFtZSI6Ik1pY2hhZWwiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJlbWFpbCI6Im1pY2hhZWxAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyODgwNjIyMn0.iwc71QX86R90QF94K2E8z04uE7AD5tQ9cHX9g4hCdks'),
(4, 'Emily', 'Williams', 'emily@gmail.com', '$2b$10$ZqEIhXfURBrUbhWFREnV6uPS6GEDJLFJ.iljIK1XRk62MpbA4qYZ.', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImZpcnN0TmFtZSI6IkVtaWx5IiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImVtYWlsIjoiZW1pbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyODgwNjI3Nn0.lnnqJPZgsTzE_tX4BLgfXD0lwKiWIGOhD-P_SW7KINU'),
(5, 'David', 'Brown', 'david@gmail.com', '$2b$10$JZiJJ22V3jOnnFDQu5yQMec8MVuWJ0DOCusRwozMwzU8i4JlnT/ua', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImZpcnN0TmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJCcm93biIsImVtYWlsIjoiZGF2aWRAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyODgwNjM0NH0.Q-9XaCmat96u8rACyoOXHKibC-7U8PqXriqm_3yThFE'),
(6, 'Chris', 'Garcia', 'chris@gmail.com', '$2b$10$npd7Jq1rxyWADX7hqF1nBOsemGEJEHXMzxXRuVo5XbdL8yPv7usKO', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImZpcnN0TmFtZSI6IkNocmlzIiwibGFzdE5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImNocmlzQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDYzOTR9.rtL9L4xYvPYDyOQ9XFRBoAiyHom7Lj3JfseYH8W_5gU'),
(7, 'Jessica', 'Martinez', 'jessica@gmail.com', '$2b$10$kDVy6YIYma4WZN9dfotmfuwklmjYkekZn7O23E/M7BSD8zEY6GvTe', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImZpcnN0TmFtZSI6Ikplc3NpY2EiLCJsYXN0TmFtZSI6Ik1hcnRpbmV6IiwiZW1haWwiOiJqZXNzaWNhQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDY0NDd9.ZQ7gJPlqz9hKu7yB3mA-8PB6C8QAosn90kipPUfv-6c'),
(8, 'Laura', 'Lee', 'laura@gmail.com', '$2b$10$D.ylfNdGzTVGwVbSKB8c9eTrnRNRTdgwBsCB0EF7bRjrnltvDyRXy', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImZpcnN0TmFtZSI6IkxhdXJhIiwibGFzdE5hbWUiOiJMZWUiLCJlbWFpbCI6ImxhdXJhQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDY0OTh9.y9NZ3bIBJcdIavABGyVeBRNPjElT3hbLBPL0-zxQa1A'),
(9, 'Brian', 'Walker', 'brian@gmail.com', '$2b$10$Ma6T/oo/gpB.k.8j93cmPOsxkJ94VmShfq6ZJ6KDlEWxRWtfRRuta', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImZpcnN0TmFtZSI6IkJyaWFuIiwibGFzdE5hbWUiOiJXYWxrZXIiLCJlbWFpbCI6ImJyaWFuQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDY1NDN9.Fev2uA7-OeGv5hJM6XkFzEzTIU1WAb2DapcQJYTbc0w'),
(10, 'Anna', 'Hall', 'anna@gmail.com', '$2b$10$ci4QZTet95TJAi5BFKcP0ePF/E/A7rg1nyoRyxIcBxqv8keNFe276', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJmaXJzdE5hbWUiOiJBbm5hIiwibGFzdE5hbWUiOiJIYWxsIiwiZW1haWwiOiJhbm5hQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDY1OTR9.fDOaeLfdEMACQoSnS8gf9f80o-2SRa-xkrxXOvYt5tI'),
(11, 'ori', 'brook', 'ori@gmai.com', '$2b$10$xh2zOZkM5quVT8fPyGhzou.IQJsduGyGE7lPBYpMbB3mpD0NK9Zeq', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJmaXJzdE5hbWUiOiJvcmkiLCJsYXN0TmFtZSI6ImJyb29rIiwiZW1haWwiOiJvcmlAZ21haS5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMwMzg4NTg1fQ.FsHja2b3ol3XQ_xa-xu3FS-7hFR_RbleuISv_86rWm0');

-- --------------------------------------------------------

--
-- Table structure for table `vacation`
--

CREATE TABLE `vacation` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) DEFAULT NULL CHECK (`price` >= 0 and `price` <= 10000),
  `imageFileName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacation`
--

INSERT INTO `vacation` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageFileName`) VALUES
(1, 'Hawaii', 'Experience the unparalleled beauty of Hawaii, a tropical paradise offering stunning beaches, lush rainforests, and volcanic landscapes. Whether you\'re relaxing on the white sands of Waikiki Beach, hiking the rugged trails of Kauai’s Na Pali Coast, or exploring the active volcanoes on the Big Island, Hawaii promises adventure and relaxation in equal measure. The islands are rich in Polynesian culture, offering visitors a glimpse into its traditions, music, and delicious cuisine, like poke and loco moco. Whether you’re snorkeling with sea turtles or enjoying a luau, Hawaii provides a vacation filled with unforgettable moments.', '2024-10-01', '2024-10-10', 3000.00, '869a9e27-aab0-460b-a047-ac21554f6354.jpg'),
(2, 'Paris', 'Paris, the City of Light, enchants visitors with its timeless charm, world-class art, and romantic ambiance. From the iconic Eiffel Tower and the Notre-Dame Cathedral to the masterpieces housed in the Louvre, the city offers a rich blend of history, culture, and art. Wander through charming neighborhoods like Le Marais, enjoy a leisurely stroll along the Seine, and indulge in gourmet French cuisine at sidewalk cafés. With its fashion-forward boutiques, elegant gardens, and vibrant nightlife, Paris is a dream destination for travelers seeking a perfect mix of elegance and adventure.', '2024-12-01', '2024-12-10', 2500.00, '64c17ce8-175c-411d-998c-c9b1dc075608.jpg'),
(3, 'Tokyo', 'Tokyo, Japan’s bustling capital, is a mesmerizing blend of ancient traditions and futuristic innovation. From the serene Meiji Shrine and historic Asakusa temples to the neon-lit streets of Shibuya and Shinjuku, Tokyo offers a unique mix of experiences. Taste world-class sushi at the famous Tsukiji Fish Market, shop in the ultra-modern district of Ginza, or enjoy a quiet moment in one of the city’s beautiful parks. Whether you\'re catching a glimpse of Mount Fuji from afar or exploring Tokyo’s art and technology hubs, this vibrant metropolis is a gateway to Japanese culture and modernity.', '2024-11-01', '2024-11-12', 4000.00, '6861c2bb-bed2-4126-8c54-a135610f2961.jpg'),
(4, 'New York', 'New York City, known as the Big Apple, is a melting pot of culture, art, and entertainment. From the towering skyscrapers of Manhattan to the tranquility of Central Park, New York has something for everyone. Visit iconic landmarks like the Statue of Liberty, Empire State Building, and Times Square, or explore world-class museums such as the Metropolitan Museum of Art and the Museum of Modern Art. Experience Broadway shows, diverse cuisines, and vibrant neighborhoods like Chinatown and Harlem. With its endless energy and diverse experiences, New York is a city that always keeps you coming back.', '2024-09-15', '2024-09-25', 3500.00, '55729623-01b1-4dfe-be09-248b4d6b4e7b.jpeg'),
(5, 'London', 'London is a city where history meets modernity, offering a rich tapestry of cultural experiences. Marvel at historic landmarks such as the Tower of London, Buckingham Palace, and Westminster Abbey, or take a stroll along the River Thames to see the iconic Tower Bridge and the London Eye. Explore the world-class British Museum and Natural History Museum or enjoy shopping in bustling areas like Covent Garden and Oxford Street. With its lively theatre scene in the West End, traditional afternoon teas, and beautiful royal parks, London is a dynamic city that offers something for everyone.', '2024-08-01', '2024-08-08', 2000.00, '4611f447-b8ba-49f3-a83c-b0f7d552f956.jpg'),
(6, 'Sydney', 'Sydney, Australia’s iconic coastal city, is renowned for its sparkling harbor, stunning beaches, and vibrant city life. Visit the world-famous Sydney Opera House and enjoy the views from Sydney Harbour Bridge. Relax on Bondi Beach, where surfers and sunbathers alike enjoy the crystal-clear waters. For outdoor enthusiasts, there’s plenty to explore, from the Blue Mountains to scenic harbor cruises. Sydney also offers a rich cultural experience, with diverse food markets, art galleries, and buzzing nightlife. Whether you’re seeking adventure or relaxation, Sydney is a dynamic destination that promises unforgettable experiences.', '2024-07-01', '2024-07-10', 5000.00, '2873be5b-9872-4fad-98cd-1633d638355d.jpg'),
(7, 'Rome', 'Rome, the Eternal City, is a treasure trove of ancient history, art, and culture. Wander through the Roman Forum and Colosseum to discover the heart of the Roman Empire or visit Vatican City to marvel at St. Peter\'s Basilica and Michelangelo\'s Sistine Chapel. Stroll through charming piazzas, where you can enjoy a cappuccino or a slice of Roman pizza. Don’t forget to toss a coin into the Trevi Fountain for good luck. With its rich history, world-renowned architecture, and delicious Italian cuisine, Rome is a must-visit destination for travelers seeking to experience Italy’s grandeur.', '2024-10-20', '2024-10-30', 1800.00, '2d8ba150-1e9d-4c1a-89cc-5f268095640a.jpg'),
(8, 'Los Angeles', 'Los Angeles, the City of Angels, is a bustling metropolis known for its entertainment industry, sunny beaches, and cultural diversity. Home to Hollywood, visitors can explore the Walk of Fame, take a studio tour, or hike up to the iconic Hollywood sign. Relax on the golden shores of Santa Monica and Venice Beach or explore the upscale shops of Rodeo Drive in Beverly Hills. L.A. also boasts diverse cuisine, art galleries, and museums, such as the Getty Center. With its mix of glamour, creativity, and outdoor adventure, Los Angeles offers an exciting escape for any traveler.', '2024-06-01', '2024-06-12', 3200.00, '1b477010-7e51-44bd-bd05-f12e911689ec.jpg'),
(9, 'Berlin', 'Berlin is a city with a rich history and a cutting-edge modern culture. Visit iconic landmarks such as the Brandenburg Gate, Berlin Wall Memorial, and Checkpoint Charlie to get a sense of the city’s past. Explore its thriving arts scene in areas like Kreuzberg and Friedrichshain, or visit world-class museums on Museum Island. Berlin’s vibrant nightlife, eclectic food scene, and festivals make it a dynamic destination. Whether you\'re into history, art, or innovation, Berlin offers a fascinating blend of old and new, making it one of Europe’s most exciting cities to explore.', '2024-05-01', '2024-05-10', 2100.00, '650a1fb6-fd69-4ec0-93d5-5650d25ea8fc.jpg'),
(10, 'Dubai', 'Dubai, a city of luxury and innovation, offers an unparalleled experience in the heart of the desert. Known for its futuristic skyline, including the iconic Burj Khalifa, the world’s tallest building, Dubai is a place where modernity meets tradition. Shop in world-class malls, enjoy luxury dining, or explore the old-world charm of the Bastakiya Quarter. Thrill-seekers can go on a desert safari, skydive over Palm Jumeirah, or enjoy water sports on pristine beaches. Dubai’s opulence and adventurous spirit make it a dream destination for travelers seeking both luxury and excitement.', '2024-04-01', '2024-04-10', 6000.00, 'c10e711d-11f4-45c0-97e8-09da23e9c11f.jpeg'),
(11, 'Amsterdam', 'Amsterdam is a city of picturesque canals, historic architecture, and a vibrant cultural scene. Explore the city by bike or boat, taking in views of its beautiful 17th-century buildings and flower-lined streets. Visit world-renowned museums like the Van Gogh Museum and the Anne Frank House, or simply enjoy the city’s laid-back atmosphere in one of its many cafés. Amsterdam is also famous for its thriving art scene, vibrant nightlife, and cozy markets. Whether you\'re wandering through the historic Jordaan district or admiring the blooming tulips in nearby fields, Amsterdam offers charm and beauty at every turn.', '2024-03-15', '2024-03-22', 1500.00, '7464e104-6845-45fb-b0bc-0cd97acba93b.png'),
(12, 'Bangkok', 'Bangkok is a bustling metropolis where tradition and modernity collide in a whirlwind of sights, sounds, and tastes. Visit the ornate Grand Palace and Wat Pho, home to the reclining Buddha, or take a boat ride along the Chao Phraya River. Bangkok’s vibrant street markets, from the Chatuchak Weekend Market to the floating markets, offer everything from food to souvenirs. Sample delicious Thai cuisine, from spicy street food to refined restaurant dishes. With its lively nightlife, historic temples, and modern malls, Bangkok is a dynamic city that offers endless exploration and adventure.', '2024-02-01', '2024-02-10', 2700.00, '88a42b07-0dc3-4346-b7f5-fd76aa14b1af.jpg'),
(13, 'Cairo', 'Step into the ancient world with a visit to Cairo, Egypt’s bustling capital, known for its rich history and stunning landmarks. Stand in awe of the Great Pyramids of Giza and the Sphinx, some of the most iconic structures in human history. Explore the Egyptian Museum to see a vast collection of antiquities, including treasures from King Tutankhamun’s tomb. Wander through the vibrant bazaars of Khan El Khalili or take a boat ride on the Nile River. With its mix of ancient wonders and vibrant city life, Cairo offers an unforgettable journey through time.', '2024-01-15', '2024-01-25', 1200.00, 'aa15d08e-eb3a-46ec-b428-cf8c5070a083.jpg'),
(14, 'Barcelona', 'Barcelona is a vibrant coastal city known for its stunning architecture, world-class art, and Mediterranean beaches. The works of architect Antoni Gaudí, including the awe-inspiring Sagrada Família and whimsical Park Güell, define the city’s unique style. Stroll along the famous La Rambla, visit the bustling markets, and indulge in delicious tapas and seafood. Barcelona’s Gothic Quarter offers a glimpse into the city’s medieval past, while its lively bars and beach clubs add a modern touch. Whether you\'re an art lover, foodie, or beachgoer, Barcelona has something to captivate every traveler.', '2024-11-20', '2024-11-30', 2300.00, '47dcb0c0-478c-4010-9fa9-58205fe3f997.jpeg'),
(15, 'Cape Town', 'Cape Town is a stunning city nestled between Table Mountain and the Atlantic Ocean, offering breathtaking views and diverse experiences. Take a cable car up Table Mountain for panoramic views, visit the historic Robben Island, or explore the scenic Cape Peninsula. The city is also known for its vibrant culture, with colorful neighborhoods like Bo-Kaap, lively markets, and world-class restaurants. Outdoor enthusiasts can enjoy hiking, surfing, or whale watching. Whether you\'re sipping wine in Stellenbosch or lounging on Camps Bay Beach, Cape Town is a dynamic destination that combines natural beauty with rich cultural history.', '2024-08-15', '2024-08-25', 3800.00, '57f9a3cc-40ce-4875-80b5-0438f59eac6d.jpg'),
(16, 'Israel', 'Israel is a country of diverse landscapes, ancient history, and a vibrant cultural scene. Explore the rich tapestry of its cities, from the bustling markets of Jerusalem to the modern, cosmopolitan vibe of Tel Aviv. Wander through historic sites like the Old City of Jerusalem, where ancient walls and sacred landmarks tell stories of millennia. Visit world-renowned attractions such as the Dead Sea, where you can float in its salty waters, and Masada, a fortress with breathtaking views of the desert. Israel also boasts stunning Mediterranean beaches, lively nightlife, and a unique blend of traditions and innovation. Whether you\'re exploring the ancient ruins of Caesarea or enjoying the vibrant street life in Jaffa, Israel offers beauty and history at every corner.', '2024-10-29', '2024-11-15', 5000.00, '968667d1-9f7a-41e1-8435-ca4f1688b866.jpg'),
(17, 'paris', 'hfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kjhfj  kgkj jg kj', '2024-11-07', '2024-11-14', 9.00, '32fdcebc-6f18-4e84-b520-bbc8b96668cd.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follower`
--
ALTER TABLE `follower`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `vacation`
--
ALTER TABLE `vacation`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `follower`
--
ALTER TABLE `follower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vacation`
--
ALTER TABLE `vacation`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follower`
--
ALTER TABLE `follower`
  ADD CONSTRAINT `follower_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
  ADD CONSTRAINT `follower_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacation` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
