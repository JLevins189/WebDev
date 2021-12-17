-- Database: webdevassignment

-- DROP DATABASE IF EXISTS webdevassignment;

CREATE DATABASE webdevassignment
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_Ireland.1252'
    LC_CTYPE = 'English_Ireland.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
-- Table: public.bookinginfo

-- DROP TABLE IF EXISTS public.bookinginfo;

CREATE TABLE IF NOT EXISTS public.bookinginfo
(
    seat_bookingid integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 1000000 CACHE 1 ),
    email character varying COLLATE pg_catalog."default" NOT NULL,
    movie_name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT bookinginfo_pkey PRIMARY KEY (seat_bookingid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bookinginfo
    OWNER to postgres;


-- Table: public.seat_booking

-- DROP TABLE IF EXISTS public.seat_booking;

CREATE TABLE IF NOT EXISTS public.seat_booking
(
    seat_booking_id numeric(3,0) NOT NULL,
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    seat_no numeric(3,0) NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.seat_booking
    OWNER to postgres;



-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    email character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    profilepicture character varying(125) COLLATE pg_catalog."default",
    answer1 character varying(100) COLLATE pg_catalog."default" NOT NULL,
    answer2 character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;




-- Table: public.wishlist

-- DROP TABLE IF EXISTS public.wishlist;

CREATE TABLE IF NOT EXISTS public.wishlist
(
    movie_name character varying COLLATE pg_catalog."default" NOT NULL,
    user_email character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "user" FOREIGN KEY (user_email)
        REFERENCES public.users (email) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.wishlist
    OWNER to postgres;	