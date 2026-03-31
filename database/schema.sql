CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    selected_charity_id UUID,
    charity_percentage INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE charities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    category VARCHAR(100),
    upcoming_event TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE users
ADD CONSTRAINT fk_selected_charity
FOREIGN KEY (selected_charity_id)
REFERENCES charities(id)
ON DELETE SET NULL;

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    plan_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    renewal_date TIMESTAMP,
    amount_paid DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE golf_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    score INT NOT NULL,
    score_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE monthly_draws (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    month INT NOT NULL,
    year INT NOT NULL,
    draw_type VARCHAR(50),
    winning_numbers TEXT,
    jackpot_amount DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE draw_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    draw_id UUID NOT NULL,
    matched_numbers INT DEFAULT 0,
    prize_type VARCHAR(50),
    winnings_amount DECIMAL(10,2) DEFAULT 0,
    payment_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (draw_id) REFERENCES monthly_draws(id) ON DELETE CASCADE
);

CREATE TABLE winner_proofs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    draw_entry_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    uploaded_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (draw_entry_id) REFERENCES draw_entries(id) ON DELETE CASCADE
);

CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    charity_id UUID NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    source VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (charity_id) REFERENCES charities(id) ON DELETE CASCADE
);