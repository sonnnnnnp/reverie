/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/authorize/refresh": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 認証トークンを更新 */
        post: operations["refreshAuthorization"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/authorize/line": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** LINE でログイン */
        post: operations["authorizeWithLine"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/{post_id}/favorites": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 投稿にいいねしたユーザーを取得する */
        get: operations["GetPostFavorites"];
        put?: never;
        /** 投稿にいいねする */
        post: operations["favoritePost"];
        /** 投稿のいいねを解除する */
        delete: operations["unfavoritePost"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** 投稿を作成する */
        post: operations["createPost"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/{post_id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 投稿を取得する */
        get: operations["getPostByID"];
        put?: never;
        post?: never;
        /** 投稿を削除する */
        delete: operations["deletePost"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{user_id}/follows": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** ユーザーをフォローする */
        post: operations["followUser"];
        /** ユーザーをアンフォローする */
        delete: operations["unfollowUser"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{user_id}/following": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** ユーザーのフォロー一覧を取得する */
        get: operations["getUserFollowing"];
        put?: never;
        post?: never;
        /** ユーザーをフォロワーから削除する */
        delete: operations["removeUserFromFollowers"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{user_id}/followers": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** ユーザーのフォロワー一覧を取得する */
        get: operations["getUserFollowers"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{user_id}/blocks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** ユーザーをブロックする */
        post: operations["blockUser"];
        /** ユーザーをアンブロックする */
        delete: operations["unblockUser"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/blocks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** ユーザーのブロック一覧を取得する */
        get: operations["getUserBlocking"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{name}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** ユーザーを取得する */
        get: operations["getUserByName"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/update": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** ユーザーを更新する */
        put: operations["updateUser"];
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 自分を取得する */
        get: operations["getSelf"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/timeline": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** タイムラインを取得する */
        get: operations["getTimeline"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/stream": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * WebSocket ストリーム
         * @description Note: This endpoint is designated for WebSocket gateway usage and cannot be used as a REST API.
         */
        get: operations["stream"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        User: {
            /**
             * Format: uuid
             * @description ID番号
             */
            id: string;
            /** @description 名前 */
            name: string;
            nickname: string;
            avatar_image_url: string | null;
            banner_image_url: string | null;
            biography: string | null;
            is_private: boolean;
            block_status?: components["schemas"]["BlockStatus"];
            social_connection?: components["schemas"]["SocialConnection"];
            social_engagement?: components["schemas"]["SocialEngagement"];
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            created_at: string;
        };
        SocialConnection: {
            following: boolean;
            followed_by: boolean;
        };
        Users: {
            users: components["schemas"]["User"][];
        };
        BlockStatus: {
            blocking: boolean;
            blocked_by: boolean;
        };
        SocialEngagement: {
            following_count: number;
            followers_count: number;
            posts_count: number;
            media_count: number;
            favorites_count: number;
        };
        Authorization: {
            user_id: string;
            access_token: string;
            refresh_token: string;
            is_new: boolean;
        };
        Post: {
            /**
             * Format: uuid
             * @description ID番号
             */
            id: string;
            author: components["schemas"]["User"];
            text: string | null;
            favorited: boolean;
            favorites_count: number;
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            created_at: string;
        };
        PostFavorite: {
            /** Format: uuid */
            post_id: string;
            /** Format: date-time */
            created_at: string;
            user: components["schemas"]["User"];
        };
        Timeline: {
            posts: components["schemas"]["Post"][];
            /**
             * Format: uuid
             * @description 次のページを取得するためのキー
             */
            next_cursor: string;
        };
        SocialSetting: {
            lineId: string | null;
        };
        UserFollower: {
            /**
             * Format: uuid
             * @description ID番号
             */
            id: string;
            /** @description 名前 */
            name: string;
            nickname: string;
            avatar_image_url: string | null;
            banner_image_url: string | null;
            biography: string | null;
            is_private: boolean;
            block_status?: components["schemas"]["BlockStatus"];
            social_connection?: components["schemas"]["SocialConnection"];
            social_engagement?: components["schemas"]["SocialEngagement"];
            /** Format: date-time */
            updated_at: string;
            /** Format: date-time */
            created_at: string;
            /** Format: date-time */
            followed_at: string;
        };
        UserFollowers: {
            users: components["schemas"]["UserFollower"][];
        };
        Response: {
            /** @description 正常に処理を終了したかどうか */
            ok: boolean;
            /** @description レスポンスコード */
            code: number;
            /** @description データ */
            data: Record<string, never>;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    refreshAuthorization: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    refresh_token: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        /** @description データ */
                        data: components["schemas"]["Authorization"];
                    };
                };
            };
        };
    };
    authorizeWithLine: {
        parameters: {
            query: {
                code: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        /** @description データ */
                        data: components["schemas"]["Authorization"];
                    };
                };
            };
        };
    };
    GetPostFavorites: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        /** @description データ */
                        data: components["schemas"]["PostFavorite"][];
                    };
                };
            };
        };
    };
    favoritePost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Response"];
                };
            };
        };
    };
    unfavoritePost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Response"];
                };
            };
        };
    };
    createPost: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    content?: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        data: components["schemas"]["Post"];
                    };
                };
            };
        };
    };
    getPostByID: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        data: components["schemas"]["Post"];
                    };
                };
            };
        };
    };
    deletePost: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                post_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        /** @description データ */
                        data: Record<string, never>;
                    };
                };
            };
        };
    };
    followUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        data: components["schemas"]["SocialConnection"];
                    };
                };
            };
        };
    };
    unfollowUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        data: components["schemas"]["SocialConnection"];
                    };
                };
            };
        };
    };
    getUserFollowing: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        /** @description データ */
                        data: components["schemas"]["Users"];
                    };
                };
            };
        };
    };
    removeUserFromFollowers: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        data: components["schemas"]["SocialConnection"];
                    };
                };
            };
        };
    };
    getUserFollowers: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        /** @description データ */
                        data: components["schemas"]["UserFollowers"];
                    };
                };
            };
        };
    };
    blockUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Response"];
                };
            };
        };
    };
    unblockUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                user_id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Response"];
                };
            };
        };
    };
    getUserBlocking: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        /** @description データ */
                        data: components["schemas"]["Users"];
                    };
                };
            };
        };
    };
    getUserByName: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                name: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        data: components["schemas"]["User"];
                    };
                };
            };
        };
    };
    updateUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    name?: string;
                    nickname?: string;
                    avatar_image_url?: string;
                    banner_image_url?: string;
                    biography?: string;
                    /** Format: date-time */
                    birthdate?: string;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        data: components["schemas"]["User"];
                    };
                };
            };
        };
    };
    getSelf: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        data: components["schemas"]["User"];
                    };
                };
            };
        };
    };
    getTimeline: {
        parameters: {
            query?: {
                /** @description 次のページを取得するためのキー */
                cursor?: string;
                limit?: number;
                user_id?: string;
                following?: boolean;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description 正常に処理を終了したかどうか */
                        ok: boolean;
                        /** @description レスポンスコード */
                        code: number;
                        /** @description データ */
                        data: components["schemas"]["Timeline"];
                    };
                };
            };
        };
    };
    stream: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
}
