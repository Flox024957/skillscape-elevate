export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      friend_suggestions: {
        Row: {
          created_at: string
          id: string
          score: number | null
          suggested_friend_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          score?: number | null
          suggested_friend_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          score?: number | null
          suggested_friend_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friend_suggestions_suggested_friend_id_fkey"
            columns: ["suggested_friend_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friend_suggestions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      friendships: {
        Row: {
          created_at: string
          friend_id: string | null
          id: string
          status: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          friend_id?: string | null
          id?: string
          status?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          friend_id?: string | null
          id?: string
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "friendships_friend_id_fkey"
            columns: ["friend_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friendships_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_achievements: {
        Row: {
          condition_type: string
          condition_value: number
          created_at: string
          description: string
          icon_name: string
          id: string
          title: string
        }
        Insert: {
          condition_type: string
          condition_value: number
          created_at?: string
          description: string
          icon_name: string
          id?: string
          title: string
        }
        Update: {
          condition_type?: string
          condition_value?: number
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      game_leaderboards: {
        Row: {
          created_at: string
          game_type: string
          games_played: number | null
          games_won: number | null
          id: string
          score: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          game_type: string
          games_played?: number | null
          games_won?: number | null
          id?: string
          score?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          game_type?: string
          games_played?: number | null
          games_won?: number | null
          id?: string
          score?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_leaderboards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_participants: {
        Row: {
          id: string
          joined_at: string
          score: number | null
          session_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string
          score?: number | null
          session_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string
          score?: number | null
          session_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_participants_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      game_questions: {
        Row: {
          category: string
          correct_answer: string
          created_at: string
          difficulty: number
          id: string
          options: Json
          question: string
          updated_at: string
        }
        Insert: {
          category: string
          correct_answer: string
          created_at?: string
          difficulty?: number
          id?: string
          options: Json
          question: string
          updated_at?: string
        }
        Update: {
          category?: string
          correct_answer?: string
          created_at?: string
          difficulty?: number
          id?: string
          options?: Json
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          created_at: string
          current_players: number
          ended_at: string | null
          game_data: Json | null
          game_type: string
          id: string
          max_players: number
          started_at: string | null
          status: string
          winner_id: string | null
        }
        Insert: {
          created_at?: string
          current_players?: number
          ended_at?: string | null
          game_data?: Json | null
          game_type: string
          id?: string
          max_players: number
          started_at?: string | null
          status?: string
          winner_id?: string | null
        }
        Update: {
          created_at?: string
          current_players?: number
          ended_at?: string | null
          game_data?: Json | null
          game_type?: string
          id?: string
          max_players?: number
          started_at?: string | null
          status?: string
          winner_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_winner_id_fkey"
            columns: ["winner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string | null
          id: string
          joined_at: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          group_id?: string | null
          id?: string
          joined_at?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          group_id?: string | null
          id?: string
          joined_at?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      group_posts: {
        Row: {
          attachment_type: string | null
          attachment_url: string | null
          content: string
          created_at: string
          group_id: string | null
          id: string
          image_url: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          attachment_type?: string | null
          attachment_url?: string | null
          content: string
          created_at?: string
          group_id?: string | null
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          attachment_type?: string | null
          attachment_url?: string | null
          content?: string
          created_at?: string
          group_id?: string | null
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "group_posts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "group_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          cover_image: string | null
          created_at: string
          creator_id: string | null
          description: string | null
          id: string
          is_private: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          creator_id?: string | null
          description?: string | null
          id?: string
          is_private?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read: boolean | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mind_map_collaborators: {
        Row: {
          created_at: string
          id: string
          mind_map_id: string | null
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          mind_map_id?: string | null
          role?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          mind_map_id?: string | null
          role?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mind_map_collaborators_mind_map_id_fkey"
            columns: ["mind_map_id"]
            isOneToOne: false
            referencedRelation: "mind_maps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mind_map_collaborators_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mind_map_history: {
        Row: {
          action: string
          created_at: string
          data: Json
          id: string
          mind_map_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          data: Json
          id?: string
          mind_map_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          data?: Json
          id?: string
          mind_map_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mind_map_history_mind_map_id_fkey"
            columns: ["mind_map_id"]
            isOneToOne: false
            referencedRelation: "mind_maps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mind_map_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mind_map_node_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          mind_map_id: string | null
          node_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          mind_map_id?: string | null
          node_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          mind_map_id?: string | null
          node_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mind_map_node_comments_mind_map_id_fkey"
            columns: ["mind_map_id"]
            isOneToOne: false
            referencedRelation: "mind_maps"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mind_map_node_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      mind_map_templates: {
        Row: {
          category: string
          created_at: string
          data: Json
          description: string | null
          id: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          data?: Json
          description?: string | null
          id?: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          data?: Json
          description?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      mind_maps: {
        Row: {
          created_at: string
          data: Json
          id: string
          is_template: boolean | null
          score: number | null
          skills_metadata: Json | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json
          id?: string
          is_template?: boolean | null
          score?: number | null
          skills_metadata?: Json | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          is_template?: boolean | null
          score?: number | null
          skills_metadata?: Json | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mind_maps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          content: string
          created_at: string
          id: string
          link: string | null
          read: boolean | null
          type: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean | null
          type: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean | null
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          post_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          post_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "post_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          attachment_type: string | null
          attachment_url: string | null
          content: string
          created_at: string
          id: string
          image_url: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          attachment_type?: string | null
          attachment_url?: string | null
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          attachment_type?: string | null
          attachment_url?: string | null
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          achievements: Json | null
          availability_status: string | null
          banner_image: string | null
          certifications: Json | null
          created_at: string
          current_job: string | null
          description: string | null
          dream_job: string | null
          education: Json | null
          experience: Json | null
          id: string
          image_profile: string | null
          interests: string[] | null
          languages: string[] | null
          location: string | null
          personal_goals: Json | null
          privacy_settings: Json | null
          pseudo: string | null
          social_links: Json | null
          theme_preferences: Json | null
          updated_at: string
          website: string | null
        }
        Insert: {
          achievements?: Json | null
          availability_status?: string | null
          banner_image?: string | null
          certifications?: Json | null
          created_at?: string
          current_job?: string | null
          description?: string | null
          dream_job?: string | null
          education?: Json | null
          experience?: Json | null
          id: string
          image_profile?: string | null
          interests?: string[] | null
          languages?: string[] | null
          location?: string | null
          personal_goals?: Json | null
          privacy_settings?: Json | null
          pseudo?: string | null
          social_links?: Json | null
          theme_preferences?: Json | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          achievements?: Json | null
          availability_status?: string | null
          banner_image?: string | null
          certifications?: Json | null
          created_at?: string
          current_job?: string | null
          description?: string | null
          dream_job?: string | null
          education?: Json | null
          experience?: Json | null
          id?: string
          image_profile?: string | null
          interests?: string[] | null
          languages?: string[] | null
          location?: string | null
          personal_goals?: Json | null
          privacy_settings?: Json | null
          pseudo?: string | null
          social_links?: Json | null
          theme_preferences?: Json | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      skill_builder_structures: {
        Row: {
          created_at: string
          id: string
          name: string
          score: number | null
          skills: Json[]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          score?: number | null
          skills: Json[]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          score?: number | null
          skills?: Json[]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_builder_structures_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_illustrations: {
        Row: {
          created_at: string
          id: string
          image_url: string
          skill_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          skill_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          skill_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_illustrations_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_playlists: {
        Row: {
          created_at: string
          id: string
          name: string
          skill_order: number[] | null
          skills: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          skill_order?: number[] | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          skill_order?: number[] | null
          skills?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "skill_playlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          action_concrete: string
          category_id: string | null
          created_at: string
          description: string
          exemples: Json
          id: string
          resume: string
          titre: string
          updated_at: string
        }
        Insert: {
          action_concrete: string
          category_id?: string | null
          created_at?: string
          description: string
          exemples?: Json
          id?: string
          resume: string
          titre: string
          updated_at?: string
        }
        Update: {
          action_concrete?: string
          category_id?: string | null
          created_at?: string
          description?: string
          exemples?: Json
          id?: string
          resume?: string
          titre?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "skills_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      team_chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          session_id: string | null
          team_number: number
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          session_id?: string | null
          team_number: number
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          session_id?: string | null
          team_number?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_chat_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "game_sessions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_chat_messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          id: string
          unlocked_at: string
          user_id: string | null
        }
        Insert: {
          achievement_id?: string | null
          id?: string
          unlocked_at?: string
          user_id?: string | null
        }
        Update: {
          achievement_id?: string | null
          id?: string
          unlocked_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "game_achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          created_at: string
          description: string | null
          icon_url: string | null
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_url?: string | null
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_canvas_images: {
        Row: {
          created_at: string
          description: string | null
          folder_id: string | null
          id: string
          image_url: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          folder_id?: string | null
          id?: string
          image_url: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          folder_id?: string | null
          id?: string
          image_url?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_canvas_images_folder_id_fkey"
            columns: ["folder_id"]
            isOneToOne: false
            referencedRelation: "user_image_folders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_canvas_images_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_events: {
        Row: {
          created_at: string
          description: string | null
          end_time: string
          id: string
          location: string | null
          start_time: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_time: string
          id?: string
          location?: string | null
          start_time: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          end_time?: string
          id?: string
          location?: string | null
          start_time?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_image_folders: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_image_folders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mastered_skills: {
        Row: {
          created_at: string | null
          id: string
          mastered_at: string | null
          notes: string | null
          skill_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mastered_at?: string | null
          notes?: string | null
          skill_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mastered_at?: string | null
          notes?: string | null
          skill_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_mastered_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_mastered_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notes: {
        Row: {
          content: string
          created_at: string
          id: string
          tags: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          tags?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          tags?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_objectives: {
        Row: {
          completed: boolean | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_objectives_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_recordings: {
        Row: {
          audio_url: string
          created_at: string
          duration: number | null
          id: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          audio_url: string
          created_at?: string
          duration?: number | null
          id?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          audio_url?: string
          created_at?: string
          duration?: number | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_recordings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          audio_preferences: Json | null
          created_at: string | null
          est_maitrisee: boolean | null
          id: string
          maitrisee_le: string | null
          notes: string | null
          position: number | null
          sections_selectionnees: string[] | null
          skill_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          audio_preferences?: Json | null
          created_at?: string | null
          est_maitrisee?: boolean | null
          id?: string
          maitrisee_le?: string | null
          notes?: string | null
          position?: number | null
          sections_selectionnees?: string[] | null
          skill_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          audio_preferences?: Json | null
          created_at?: string | null
          est_maitrisee?: boolean | null
          id?: string
          maitrisee_le?: string | null
          notes?: string | null
          position?: number | null
          sections_selectionnees?: string[] | null
          skill_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_voice_recordings: {
        Row: {
          audio_url: string
          created_at: string
          description: string | null
          duration: number | null
          folder: string | null
          id: string
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          audio_url: string
          created_at?: string
          description?: string | null
          duration?: number | null
          folder?: string | null
          id?: string
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          audio_url?: string
          created_at?: string
          description?: string | null
          duration?: number | null
          folder?: string | null
          id?: string
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_voice_recordings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
