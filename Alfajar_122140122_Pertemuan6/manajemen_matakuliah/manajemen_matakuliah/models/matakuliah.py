from sqlalchemy import (
    Column,
    Integer,
    Text,
    CheckConstraint
)
from sqlalchemy.orm import validates
from .meta import Base

class MataKuliah(Base):
    """Model untuk data mata kuliah.
    
    Atribut:
        id (int): Kunci primer
        kode_matkul (str): Kode mata kuliah unik (contoh: 'IF1101')
        nama_matkul (str): Nama mata kuliah
        sks (int): Satuan Kredit Semester (1-4)
        semester (int): Nomor semester (1-8)
    
    Batasan:
        - SKS harus antara 1 sampai 4
        - Semester harus antara 1 sampai 8
        - Kode mata kuliah harus unik
    """
    __tablename__ = 'matakuliah'
    
    id = Column(Integer, primary_key=True)
    kode_matkul = Column(Text, unique=True, nullable=False)
    nama_matkul = Column(Text, nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    __table_args__ = (
        CheckConstraint('sks >= 1 AND sks <= 4', name='check_sks_range'),
        CheckConstraint('semester >= 1 AND semester <= 8', name='check_semester_range'),
    )

    @validates('sks')
    def validate_sks(self, key, value):
        """Memvalidasi jumlah SKS dalam rentang yang diizinkan."""
        if not 1 <= value <= 4:
            raise ValueError("SKS harus antara 1 sampai 4")
        return value

    @validates('semester')
    def validate_semester(self, key, value):
        """Memvalidasi nomor semester dalam rentang yang diizinkan."""
        if not 1 <= value <= 8:
            raise ValueError("Semester harus antara 1 sampai 8")
        return value

    @validates('kode_matkul')
    def validate_kode_matkul(self, key, value):
        """Memvalidasi format kode mata kuliah."""
        if not value or len(value) < 2:
            raise ValueError("Kode mata kuliah tidak valid")
        return value

    def to_dict(self):
        """Mengubah instance model menjadi dictionary untuk format JSON."""
        return {
            'id': self.id,
            'kode_matkul': self.kode_matkul,
            'nama_matkul': self.nama_matkul,
            'sks': self.sks,
            'semester': self.semester
        }

    def __repr__(self):
        """Representasi string dari objek mata kuliah."""
        return f"<MataKuliah(kode='{self.kode_matkul}', nama='{self.nama_matkul}')>"