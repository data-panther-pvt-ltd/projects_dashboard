from sqlalchemy import Column, String, DateTime, ForeignKey, func, JSON
from sqlalchemy.orm import relationship, Mapped, mapped_column
from database import Base


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    # New: array of brand colors (JSON). Kept optional for backward compatibility
    colors: Mapped[list[str] | None] = mapped_column(JSON, nullable=True)
    # Backward compatibility: primary color string
    color_hex: Mapped[str] = mapped_column(String, nullable=False, default="#111827")
    logo_url: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    users = relationship("User", back_populates="organization", cascade="all, delete")


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False, index=True)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)
    name: Mapped[str | None] = mapped_column(String, nullable=True)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    organization_id: Mapped[str] = mapped_column(String, ForeignKey("organizations.id", ondelete="CASCADE"), nullable=False)
    organization = relationship("Organization", back_populates="users")
