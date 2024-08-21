CREATE DATABASE IF NOT EXISTS travel_blog;
USE travel_blog;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Countries Table
CREATE TABLE IF NOT EXISTS countries (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    country_code VARCHAR(2) NOT NULL UNIQUE,
    country VARCHAR(100) NOT NULL
);

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(3000) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tags Table
CREATE TABLE IF NOT EXISTS tags (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Cities Table (dependent on countries)
CREATE TABLE IF NOT EXISTS cities (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    country_id INT(11) UNSIGNED NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- Posts Table (dependent on users, countries, categories)
CREATE TABLE IF NOT EXISTS posts (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(3000) NOT NULL,
    content TEXT NOT NULL,
    slug TEXT,
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT(11) UNSIGNED,
    country_id INT(11) UNSIGNED,
    parent_id INT(11) UNSIGNED,
    category_id INT(11) UNSIGNED,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (country_id) REFERENCES countries(id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (parent_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE SET NULL
);

-- Comments Table (dependent on posts, users, comments)
CREATE TABLE IF NOT EXISTS comments (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_id INT(11) UNSIGNED,
    parent_id INT(11) UNSIGNED,
    user_id INT(11) UNSIGNED,
    content TEXT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Pictures Table (dependent on posts)
CREATE TABLE IF NOT EXISTS pictures (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    filepath VARCHAR(255),
    post_id INT(11) UNSIGNED,
    width INT,
    height INT,
    file_size BIGINT,
    file_format VARCHAR(10),
    creation_date DATETIME,
    camera_model VARCHAR(100),
    title VARCHAR(255),
    description TEXT,
    keywords VARCHAR(255),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Likes Table (dependent on posts, users)
CREATE TABLE IF NOT EXISTS likes (
    id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    post_id INT(11) UNSIGNED,
    user_id INT(11) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Post-Category Association Table (dependent on posts, categories)
CREATE TABLE IF NOT EXISTS post_category (
    post_id INT(11) UNSIGNED,
    category_id INT(11) UNSIGNED,
    PRIMARY KEY (post_id, category_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Post-Tag Association Table (dependent on posts, tags)
CREATE TABLE IF NOT EXISTS post_tag (
    post_id INT(11) UNSIGNED,
    tag_id INT(11) UNSIGNED,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Users Table
CREATE INDEX idx_users_email ON users(email);

-- Posts Table
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_category_id ON posts(category_id);
CREATE INDEX idx_posts_country_id ON posts(country_id);
CREATE INDEX idx_posts_parent_id ON posts(parent_id);

-- Post_Category Table
CREATE INDEX idx_post_category_post_id ON post_category(post_id);
CREATE INDEX idx_post_category_category_id ON post_category(category_id);

-- Pictures Table
CREATE INDEX idx_pictures_post_id ON pictures(post_id);

-- Cities Table
CREATE INDEX idx_cities_country_id ON cities(country_id);

-- Post_Tag Table
CREATE INDEX idx_post_tag_post_id ON post_tag(post_id);
CREATE INDEX idx_post_tag_tag_id ON post_tag(tag_id);

-- Comments Table
CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);

-- Likes Table
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);


ALTER TABLE tags ADD COLUMN description TEXT;
ALTER TABLE tags ADD COLUMN parent_id INT(11) NULL;
