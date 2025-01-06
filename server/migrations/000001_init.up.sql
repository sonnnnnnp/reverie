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
