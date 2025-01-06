-- drop tables
DROP TABLE IF EXISTS call_participants;
DROP TABLE IF EXISTS calls;
DROP TABLE IF EXISTS post_favorites;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS user_blocks;
DROP TABLE IF EXISTS user_follows;
DROP TABLE IF EXISTS users;

-- drop types
DROP TYPE IF EXISTS call_participant_role;
DROP TYPE IF EXISTS call_joinable_by;
DROP TYPE IF EXISTS call_type;

-- drop extensions
DROP EXTENSION IF EXISTS "uuid-ossp";
