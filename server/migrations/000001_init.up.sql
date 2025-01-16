CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- users

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    custom_id VARCHAR(36) NOT NULL UNIQUE DEFAULT  uuid_generate_v4(),
    nickname VARCHAR(255) NOT NULL DEFAULT 'unknown',
    biography TEXT DEFAULT NULL,
    avatar_image_url VARCHAR(255) DEFAULT NULL,
    banner_image_url VARCHAR(255) DEFAULT NULL,
    is_private BOOLEAN DEFAULT FALSE,
    birthdate TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    line_id text UNIQUE DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_follows (
    follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    followed_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (follower_id, followed_id)
);

CREATE TABLE IF NOT EXISTS user_blocks (
    blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (blocker_id, blocked_id)
);

--  posts

CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reply_to_id UUID DEFAULT NULL REFERENCES posts(id),
    repost_id UUID DEFAULT NULL REFERENCES posts(id),
    text TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS post_favorites (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id, post_id)
);

-- calls

CREATE TYPE call_type AS ENUM (
    'voice',
    'video'
);

CREATE TYPE call_joinable_by AS ENUM (
    'all',
    'followers',
    'friends',
    'nobody'
);

CREATE TABLE IF NOT EXISTS calls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT DEFAULT NULL,
    type call_type NOT NULL DEFAULT 'voice',
    joinable_by call_joinable_by NOT NULL DEFAULT 'all',
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE DEFAULT NULL
);

CREATE TYPE call_participant_role AS ENUM (
    'host',
    'co-host',
    'participant'
);

CREATE TABLE IF NOT EXISTS call_participants (
    call_id UUID NOT NULL REFERENCES calls(id) ON DELETE CASCADE,
    participant_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role call_participant_role NOT NULL DEFAULT 'participant',
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    left_at TIMESTAMP WITH TIME ZONE DEFAULT NULL,
    PRIMARY KEY (call_id, participant_id)
);

-- messages

CREATE TYPE rooms_type AS ENUM (
    'individual',
    'group'
);

CREATE TABLE IF NOT EXISTS rooms (
    id SERIAL PRIMARY KEY,
    rooms_type rooms_type, -- individual | group
    name VARCHAR(100), -- 個人チャット(individual)の場合はNULL
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS room_members (
    id SERIAL PRIMARY KEY,
    rooms_id INT NOT NULL REFERENCES rooms(id),
    user_id UUID NOT NULL REFERENCES users(id),
    CONSTRAINT unique_user_room UNIQUE (user_id, rooms_id) --　ユーザーとルームの組み合わせを一意に
);

CREATE TABLE IF NOT EXISTS pinned_rooms (
    id SERIAL PRIMARY KEY,
    user_id NOT NULL REFERENCES users(id),
    rooms_id NOT NULL REFERENCES rooms(id),
    pinned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    CONSTRAINT unique_user_room UNIQUE (user_id, rooms_id) --　ユーザーとルームの組み合わせを一意に
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    room_id NOT NULL REFERENCES rooms(id),
    sender_id UUID NOT NULL REFERENCES users(id),
    content VARCHAR(10000),
    has_file BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS message_reads (
    id SERIAL PRIMARY KEY,
    message_id NOT NULL REFERENCES messages(id),
    user_id UUID NOT NULL REFERENCES users(id),
    read_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TYPE file_type AS ENUM (
    'image',
    'video',
    'voice'
);

CREATE TABLE IF NOT EXISTS message_files (
    id SERIAL PRIMARY KEY,
    message_id INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    file_url TEXT NOT NULL,
    file_type file_type,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
