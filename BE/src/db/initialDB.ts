import runQuery, { closeDB } from "./dal"

const createTables = async () => {
    let Q = `
        CREATE TABLE IF NOT EXISTS user (
            userId INT AUTO_INCREMENT PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            isAdmin BOOLEAN DEFAULT false,
            token VARCHAR(255)
        );
        `
    await runQuery(Q);

    Q = `
    CREATE TABLE IF NOT EXISTS vacation (
            vacationId INT AUTO_INCREMENT PRIMARY KEY,
            destination VARCHAR(50) NOT NULL,
            description VARCHAR(1000) NOT NULL,
            startDate DATE NOT NULL,
            endDate DATE NOT NULL,
            price DECIMAL(10, 2) CHECK (price >= 0 AND price <= 10000),
            imageFileName VARCHAR(255) NOT NULL
        );
        `
    await runQuery(Q);

    Q = `
        CREATE TABLE IF NOT EXISTS follower (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT,
            vacationId INT,
            FOREIGN KEY (userId) REFERENCES user(userId),
            FOREIGN KEY (vacationId) REFERENCES vacation(vacationId)
        );
    `
    await runQuery(Q);
}

const createSampleData = async () => {
    let Q = `
    INSERT INTO user (firstName, lastName, email, password, isAdmin, token) VALUES
        ('Ruti', 'Weingarten', 'ruti@gmail.com', '$2b$10$PjpssVLHKutB6oVk.VM3qeMLuE6yxUOd9lXe.v.zOoQzKYE6o4B9G', true, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImZpcnN0TmFtZSI6IlJ1dGkiLCJsYXN0TmFtZSI6IldlaW5nYXJ0ZW4iLCJlbWFpbCI6InJ1dGlAZ21haWwuY29tIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzI4ODA3MTQwfQ.5ZvXjsB4i0Zz9I-RUWpRiBKzqc_V5PQABxxEomQCQEo'),
        ('Jane', 'Smith', 'jane@gmail.com', '$2b$10$GO9V84NZwgR.VDEdSqlOquYpZuQWwG513s82ZGY9g9jw486oeG0NG', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImZpcnN0TmFtZSI6IkphbmUiLCJsYXN0TmFtZSI6IlNtaXRoIiwiZW1haWwiOiJqYW5lQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDYxNTN9.vsv1l1C34nTsz3GAo2j7xTaHzv09Z7BE16wC__kj8Q8'),
        ('Michael', 'Johnson', 'michael@gmail.com', '$2b$10$MHB/c0rWdLaqohdCjB2CXO6ll82g7ZKxXR28impToM.3KbRNJOoxG', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImZpcnN0TmFtZSI6Ik1pY2hhZWwiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJlbWFpbCI6Im1pY2hhZWxAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyODgwNjIyMn0.iwc71QX86R90QF94K2E8z04uE7AD5tQ9cHX9g4hCdks'),
        ('Emily', 'Williams', 'emily@gmail.com', '$2b$10$ZqEIhXfURBrUbhWFREnV6uPS6GEDJLFJ.iljIK1XRk62MpbA4qYZ.', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImZpcnN0TmFtZSI6IkVtaWx5IiwibGFzdE5hbWUiOiJXaWxsaWFtcyIsImVtYWlsIjoiZW1pbHlAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyODgwNjI3Nn0.lnnqJPZgsTzE_tX4BLgfXD0lwKiWIGOhD-P_SW7KINU'),
        ('David', 'Brown', 'david@gmail.com', '$2b$10$JZiJJ22V3jOnnFDQu5yQMec8MVuWJ0DOCusRwozMwzU8i4JlnT/ua', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImZpcnN0TmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJCcm93biIsImVtYWlsIjoiZGF2aWRAZ21haWwuY29tIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcyODgwNjM0NH0.Q-9XaCmat96u8rACyoOXHKibC-7U8PqXriqm_3yThFE'),
        ('Chris', 'Garcia', 'chris@gmail.com', '$2b$10$npd7Jq1rxyWADX7hqF1nBOsemGEJEHXMzxXRuVo5XbdL8yPv7usKO', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImZpcnN0TmFtZSI6IkNocmlzIiwibGFzdE5hbWUiOiJHYXJjaWEiLCJlbWFpbCI6ImNocmlzQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDYzOTR9.rtL9L4xYvPYDyOQ9XFRBoAiyHom7Lj3JfseYH8W_5gU'),
        ('Jessica', 'Martinez', 'jessica@gmail.com', '$2b$10$kDVy6YIYma4WZN9dfotmfuwklmjYkekZn7O23E/M7BSD8zEY6GvTe', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImZpcnN0TmFtZSI6Ikplc3NpY2EiLCJsYXN0TmFtZSI6Ik1hcnRpbmV6IiwiZW1haWwiOiJqZXNzaWNhQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDY0NDd9.ZQ7gJPlqz9hKu7yB3mA-8PB6C8QAosn90kipPUfv-6c'),
        ('Laura', 'Lee', 'laura@gmail.com', '$2b$10$D.ylfNdGzTVGwVbSKB8c9eTrnRNRTdgwBsCB0EF7bRjrnltvDyRXy', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImZpcnN0TmFtZSI6IkxhdXJhIiwibGFzdE5hbWUiOiJMZWUiLCJlbWFpbCI6ImxhdXJhQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDY0OTh9.y9NZ3bIBJcdIavABGyVeBRNPjElT3hbLBPL0-zxQa1A'),
        ('Brian', 'Walker', 'brian@gmail.com', '$2b$10$Ma6T/oo/gpB.k.8j93cmPOsxkJ94VmShfq6ZJ6KDlEWxRWtfRRuta', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksImZpcnN0TmFtZSI6IkJyaWFuIiwibGFzdE5hbWUiOiJXYWxrZXIiLCJlbWFpbCI6ImJyaWFuQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDY1NDN9.Fev2uA7-OeGv5hJM6XkFzEzTIU1WAb2DapcQJYTbc0w'),
        ('Anna', 'Hall', 'anna@gmail.com', '$2b$10$ci4QZTet95TJAi5BFKcP0ePF/E/A7rg1nyoRyxIcBxqv8keNFe276', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJmaXJzdE5hbWUiOiJBbm5hIiwibGFzdE5hbWUiOiJIYWxsIiwiZW1haWwiOiJhbm5hQGdtYWlsLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3Mjg4MDY1OTR9.fDOaeLfdEMACQoSnS8gf9f80o-2SRa-xkrxXOvYt5tI');
    `
    await runQuery(Q);

    Q = `
    INSERT INTO vacation (destination, description, startDate, endDate, price, imageFileName) VALUES
    ('Hawaii', "Experience the unparalleled beauty of Hawaii, a tropical paradise offering stunning beaches, lush rainforests, and volcanic landscapes. Whether you're relaxing on the white sands of Waikiki Beach, hiking the rugged trails of Kauai’s Na Pali Coast, or exploring the active volcanoes on the Big Island, Hawaii promises adventure and relaxation in equal measure. The islands are rich in Polynesian culture, offering visitors a glimpse into its traditions, music, and delicious cuisine, like poke and loco moco. Whether you’re snorkeling with sea turtles or enjoying a luau, Hawaii provides a vacation filled with unforgettable moments.", '2024-10-01', '2024-10-10', 3000.00, '869a9e27-aab0-460b-a047-ac21554f6354.jpg'),
    ('Paris', "Paris, the City of Light, enchants visitors with its timeless charm, world-class art, and romantic ambiance. From the iconic Eiffel Tower and the Notre-Dame Cathedral to the masterpieces housed in the Louvre, the city offers a rich blend of history, culture, and art. Wander through charming neighborhoods like Le Marais, enjoy a leisurely stroll along the Seine, and indulge in gourmet French cuisine at sidewalk cafés. With its fashion-forward boutiques, elegant gardens, and vibrant nightlife, Paris is a dream destination for travelers seeking a perfect mix of elegance and adventure.", '2024-12-01', '2024-12-10', 2500.00, '64c17ce8-175c-411d-998c-c9b1dc075608.jpg'),
    ('Tokyo', "Tokyo, Japan’s bustling capital, is a mesmerizing blend of ancient traditions and futuristic innovation. From the serene Meiji Shrine and historic Asakusa temples to the neon-lit streets of Shibuya and Shinjuku, Tokyo offers a unique mix of experiences. Taste world-class sushi at the famous Tsukiji Fish Market, shop in the ultra-modern district of Ginza, or enjoy a quiet moment in one of the city’s beautiful parks. Whether you're catching a glimpse of Mount Fuji from afar or exploring Tokyo’s art and technology hubs, this vibrant metropolis is a gateway to Japanese culture and modernity.", '2024-11-01', '2024-11-12', 4000.00, '6861c2bb-bed2-4126-8c54-a135610f2961.jpg'),
    ('New York', "New York City, known as the Big Apple, is a melting pot of culture, art, and entertainment. From the towering skyscrapers of Manhattan to the tranquility of Central Park, New York has something for everyone. Visit iconic landmarks like the Statue of Liberty, Empire State Building, and Times Square, or explore world-class museums such as the Metropolitan Museum of Art and the Museum of Modern Art. Experience Broadway shows, diverse cuisines, and vibrant neighborhoods like Chinatown and Harlem. With its endless energy and diverse experiences, New York is a city that always keeps you coming back.", '2024-09-15', '2024-09-25', 3500.00, '55729623-01b1-4dfe-be09-248b4d6b4e7b.jpeg'),
    ('London', "London is a city where history meets modernity, offering a rich tapestry of cultural experiences. Marvel at historic landmarks such as the Tower of London, Buckingham Palace, and Westminster Abbey, or take a stroll along the River Thames to see the iconic Tower Bridge and the London Eye. Explore the world-class British Museum and Natural History Museum or enjoy shopping in bustling areas like Covent Garden and Oxford Street. With its lively theatre scene in the West End, traditional afternoon teas, and beautiful royal parks, London is a dynamic city that offers something for everyone.", '2024-08-01', '2024-08-08', 2000.00, '4611f447-b8ba-49f3-a83c-b0f7d552f956.jpg'),
    ('Sydney', "Sydney, Australia’s iconic coastal city, is renowned for its sparkling harbor, stunning beaches, and vibrant city life. Visit the world-famous Sydney Opera House and enjoy the views from Sydney Harbour Bridge. Relax on Bondi Beach, where surfers and sunbathers alike enjoy the crystal-clear waters. For outdoor enthusiasts, there’s plenty to explore, from the Blue Mountains to scenic harbor cruises. Sydney also offers a rich cultural experience, with diverse food markets, art galleries, and buzzing nightlife. Whether you’re seeking adventure or relaxation, Sydney is a dynamic destination that promises unforgettable experiences.", '2024-07-01', '2024-07-10', 5000.00, '2873be5b-9872-4fad-98cd-1633d638355d.jpg'),
    ('Rome', "Rome, the Eternal City, is a treasure trove of ancient history, art, and culture. Wander through the Roman Forum and Colosseum to discover the heart of the Roman Empire or visit Vatican City to marvel at St. Peter's Basilica and Michelangelo's Sistine Chapel. Stroll through charming piazzas, where you can enjoy a cappuccino or a slice of Roman pizza. Don’t forget to toss a coin into the Trevi Fountain for good luck. With its rich history, world-renowned architecture, and delicious Italian cuisine, Rome is a must-visit destination for travelers seeking to experience Italy’s grandeur.", '2024-10-20', '2024-10-30', 1800.00, '2d8ba150-1e9d-4c1a-89cc-5f268095640a.jpg'),
    ('Los Angeles', "Los Angeles, the City of Angels, is a bustling metropolis known for its entertainment industry, sunny beaches, and cultural diversity. Home to Hollywood, visitors can explore the Walk of Fame, take a studio tour, or hike up to the iconic Hollywood sign. Relax on the golden shores of Santa Monica and Venice Beach or explore the upscale shops of Rodeo Drive in Beverly Hills. L.A. also boasts diverse cuisine, art galleries, and museums, such as the Getty Center. With its mix of glamour, creativity, and outdoor adventure, Los Angeles offers an exciting escape for any traveler.", '2024-06-01', '2024-06-12', 3200.00, '1b477010-7e51-44bd-bd05-f12e911689ec.jpg'),
    ('Berlin', "Berlin is a city with a rich history and a cutting-edge modern culture. Visit iconic landmarks such as the Brandenburg Gate, Berlin Wall Memorial, and Checkpoint Charlie to get a sense of the city’s past. Explore its thriving arts scene in areas like Kreuzberg and Friedrichshain, or visit world-class museums on Museum Island. Berlin’s vibrant nightlife, eclectic food scene, and festivals make it a dynamic destination. Whether you're into history, art, or innovation, Berlin offers a fascinating blend of old and new, making it one of Europe’s most exciting cities to explore.", '2024-05-01', '2024-05-10', 2100.00, '650a1fb6-fd69-4ec0-93d5-5650d25ea8fc.jpg'),
    ('Dubai', "Dubai, a city of luxury and innovation, offers an unparalleled experience in the heart of the desert. Known for its futuristic skyline, including the iconic Burj Khalifa, the world’s tallest building, Dubai is a place where modernity meets tradition. Shop in world-class malls, enjoy luxury dining, or explore the old-world charm of the Bastakiya Quarter. Thrill-seekers can go on a desert safari, skydive over Palm Jumeirah, or enjoy water sports on pristine beaches. Dubai’s opulence and adventurous spirit make it a dream destination for travelers seeking both luxury and excitement.", '2024-04-01', '2024-04-10', 6000.00, 'c10e711d-11f4-45c0-97e8-09da23e9c11f.jpeg'),
    ('Amsterdam', "Amsterdam is a city of picturesque canals, historic architecture, and a vibrant cultural scene. Explore the city by bike or boat, taking in views of its beautiful 17th-century buildings and flower-lined streets. Visit world-renowned museums like the Van Gogh Museum and the Anne Frank House, or simply enjoy the city’s laid-back atmosphere in one of its many cafés. Amsterdam is also famous for its thriving art scene, vibrant nightlife, and cozy markets. Whether you're wandering through the historic Jordaan district or admiring the blooming tulips in nearby fields, Amsterdam offers charm and beauty at every turn.", '2024-03-15', '2024-03-22', 1500.00, '7464e104-6845-45fb-b0bc-0cd97acba93b.png'),
    ('Bangkok', "Bangkok is a bustling metropolis where tradition and modernity collide in a whirlwind of sights, sounds, and tastes. Visit the ornate Grand Palace and Wat Pho, home to the reclining Buddha, or take a boat ride along the Chao Phraya River. Bangkok’s vibrant street markets, from the Chatuchak Weekend Market to the floating markets, offer everything from food to souvenirs. Sample delicious Thai cuisine, from spicy street food to refined restaurant dishes. With its lively nightlife, historic temples, and modern malls, Bangkok is a dynamic city that offers endless exploration and adventure.", '2024-02-01', '2024-02-10', 2700.00, '88a42b07-0dc3-4346-b7f5-fd76aa14b1af.jpg'),
    ('Cairo', "Step into the ancient world with a visit to Cairo, Egypt’s bustling capital, known for its rich history and stunning landmarks. Stand in awe of the Great Pyramids of Giza and the Sphinx, some of the most iconic structures in human history. Explore the Egyptian Museum to see a vast collection of antiquities, including treasures from King Tutankhamun’s tomb. Wander through the vibrant bazaars of Khan El Khalili or take a boat ride on the Nile River. With its mix of ancient wonders and vibrant city life, Cairo offers an unforgettable journey through time.", '2024-01-15', '2024-01-25', 1200.00, 'aa15d08e-eb3a-46ec-b428-cf8c5070a083.jpg'),
    ('Barcelona', "Barcelona is a vibrant coastal city known for its stunning architecture, world-class art, and Mediterranean beaches. The works of architect Antoni Gaudí, including the awe-inspiring Sagrada Família and whimsical Park Güell, define the city’s unique style. Stroll along the famous La Rambla, visit the bustling markets, and indulge in delicious tapas and seafood. Barcelona’s Gothic Quarter offers a glimpse into the city’s medieval past, while its lively bars and beach clubs add a modern touch. Whether you're an art lover, foodie, or beachgoer, Barcelona has something to captivate every traveler.", '2024-11-20', '2024-11-30', 2300.00, '47dcb0c0-478c-4010-9fa9-58205fe3f997.jpeg'),
    ('Cape Town', "Cape Town is a stunning city nestled between Table Mountain and the Atlantic Ocean, offering breathtaking views and diverse experiences. Take a cable car up Table Mountain for panoramic views, visit the historic Robben Island, or explore the scenic Cape Peninsula. The city is also known for its vibrant culture, with colorful neighborhoods like Bo-Kaap, lively markets, and world-class restaurants. Outdoor enthusiasts can enjoy hiking, surfing, or whale watching. Whether you're sipping wine in Stellenbosch or lounging on Camps Bay Beach, Cape Town is a dynamic destination that combines natural beauty with rich cultural history.", '2024-08-15', '2024-08-25', 3800.00, '57f9a3cc-40ce-4875-80b5-0438f59eac6d.jpg'),
    ('Israel', "Israel is a country of diverse landscapes, ancient history, and a vibrant cultural scene. Explore the rich tapestry of its cities, from the bustling markets of Jerusalem to the modern, cosmopolitan vibe of Tel Aviv. Wander through historic sites like the Old City of Jerusalem, where ancient walls and sacred landmarks tell stories of millennia. Visit world-renowned attractions such as the Dead Sea, where you can float in its salty waters, and Masada, a fortress with breathtaking views of the desert. Israel also boasts stunning Mediterranean beaches, lively nightlife, and a unique blend of traditions and innovation. Whether you're exploring the ancient ruins of Caesarea or enjoying the vibrant street life in Jaffa, Israel offers beauty and history at every corner.", '2024-10-01', '2024-10-18', 5000.00, '968667d1-9f7a-41e1-8435-ca4f1688b866.jpg');
`
    await runQuery(Q);

    Q = `
    INSERT INTO follower (userId, vacationId) VALUES
    (2, 1), (2, 2), (2, 4), (2, 5), (2, 8), (2, 12), (2, 15), (3, 1), (3, 3), (3, 4), (3, 7), (3, 15), (3, 9), (3, 10), (3, 6), (4, 8), (4, 2), (4, 5), (4, 15), (4, 7), (4, 3), (4, 4), (4, 11), (5, 3), (5, 6), (5, 9), (5, 12), (5, 14), (5, 16), (6, 1), (6, 7), (6, 4), (6, 2), (6, 3), (6, 13), (6, 14), (7, 3), (7, 1), (7, 5), (7, 6), (7, 7), (7, 8), (7, 11), (7, 12), (7, 16), (8, 1), (8, 8), (8, 9), (8, 10), (8, 11), (8, 12), (9, 3), (9, 6), (9, 12), (10, 11), (10, 6), (10, 1), (10, 12);
`
    await runQuery(Q);
}

// createTables().then(() => {
//     console.log("Done creating tables");
//     closeDB();
// })

// createSampleData().then(()=>{
//     console.log("Done adding data");
//     closeDB();
// })