import argparse
import sys
import transaction

from pyramid.paster import bootstrap, setup_logging
from sqlalchemy import engine_from_config
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import sessionmaker

from .. import models
from ..models import get_tm_session
from ..models.meta import Base


def setup_models(dbsession):
    """
    Add initial model objects to the database.
    """
    courses = [
        {"kode_matkul": "FI1103", "nama_matkul": "Fisika Dasar IB", "sks": 3, "semester": 1},
        {"kode_matkul": "KU0004", "nama_matkul": "Bahasa Inggris", "sks": 2, "semester": 1},
        {"kode_matkul": "IF1101", "nama_matkul": "Pengenalan Prodi Teknik Informatika", "sks": 2, "semester": 1},
        {"kode_matkul": "IF1121", "nama_matkul": "Algoritma dan Pemrograman I", "sks": 3, "semester": 1},
        {"kode_matkul": "KU0007", "nama_matkul": "Pengantar Komputer dan Software 1", "sks": 2, "semester": 1},
        {"kode_matkul": "MA1104", "nama_matkul": "Matematika Dasar IB", "sks": 3, "semester": 1},
        {"kode_matkul": "KU1003", "nama_matkul": "Lingkungan Hidup Sumatera", "sks": 2, "semester": 1},
        {"kode_matkul": "KI1104", "nama_matkul": "Kimia Dasar 1B", "sks": 2, "semester": 1},
        {"kode_matkul": "MA1204", "nama_matkul": "Matematika Dasar II", "sks": 3, "semester": 2},
        {"kode_matkul": "FI1203", "nama_matkul": "Fisika Dasar II", "sks": 3, "semester": 2},
        {"kode_matkul": "KU0003", "nama_matkul": "Bahasa Indonesia", "sks": 2, "semester": 2},
        {"kode_matkul": "KI1204", "nama_matkul": "Kimia Dasar II", "sks": 2, "semester": 2},
        {"kode_matkul": "KU0008", "nama_matkul": "Pengantar Komputer dan Software 2", "sks": 2, "semester": 2},
        {"kode_matkul": "IF1222", "nama_matkul": "Algoritma dan Pemrograman II", "sks": 3, "semester": 2},
        {"kode_matkul": "BI1103", "nama_matkul": "Biologi Dasar 1B", "sks": 2, "semester": 2},
        {"kode_matkul": "KU1004", "nama_matkul": "Olahraga", "sks": 2, "semester": 2},
        {"kode_matkul": "IF2121", "nama_matkul": "Algoritma dan Struktur Data", "sks": 4, "semester": 3},
        {"kode_matkul": "IF2117", "nama_matkul": "Teori Bahasa Formal dan Otomata", "sks": 3, "semester": 3},
        {"kode_matkul": "KU0011", "nama_matkul": "Agama Islam", "sks": 2, "semester": 3},
        {"kode_matkul": "IF2122", "nama_matkul": "Organisasi dan Arsitektur Komputer", "sks": 3, "semester": 3},
        {"kode_matkul": "IF2116", "nama_matkul": "Matematika Diskrit", "sks": 4, "semester": 3},
        {"kode_matkul": "KU0009", "nama_matkul": "Pancasila", "sks": 2, "semester": 4},
        {"kode_matkul": "KU0006", "nama_matkul": "Studium Generale", "sks": 2, "semester": 4},
        {"kode_matkul": "IF2114", "nama_matkul": "Matriks dan Ruang Vektor", "sks": 3, "semester": 4},
        {"kode_matkul": "IF2223", "nama_matkul": "Sistem Operasi", "sks": 3, "semester": 4},
        {"kode_matkul": "IF2222", "nama_matkul": "Pemrograman Berorientasi Objek", "sks": 4, "semester": 4},
        {"kode_matkul": "IF2215", "nama_matkul": "Basis Data", "sks": 3, "semester": 4},
        {"kode_matkul": "IF4201", "nama_matkul": "Socio Informatika dan Etika Profesi", "sks": 2, "semester": 5},
        {"kode_matkul": "KU0010", "nama_matkul": "Kewarganegaraan", "sks": 2, "semester": 5},
        {"kode_matkul": "IF2214", "nama_matkul": "Probabilitas dan Statistika", "sks": 3, "semester": 5},
        {"kode_matkul": "IF2232", "nama_matkul": "Dasar Rekayasa Perangkat Lunak", "sks": 2, "semester": 5},
        {"kode_matkul": "IF2211", "nama_matkul": "Strategi Algoritma", "sks": 3, "semester": 5},
        {"kode_matkul": "IF3033", "nama_matkul": "Manajemen Proyek Teknologi Informasi", "sks": 3, "semester": 6},
        {"kode_matkul": "IF3101", "nama_matkul": "Metodologi Penelitian", "sks": 2, "semester": 6},
        {"kode_matkul": "IF3125", "nama_matkul": "Jaringan Komputer", "sks": 3, "semester": 6},
        {"kode_matkul": "KU0005", "nama_matkul": "Kuliah Kerja Nyata", "sks": 2, "semester": 6},
        {"kode_matkul": "IF3102", "nama_matkul": "Kapita Selekta Informatika", "sks": 3, "semester": 6},
        {"kode_matkul": "IF3111", "nama_matkul": "Intelegensi Buatan", "sks": 3, "semester": 7},
        {"kode_matkul": "IF3133", "nama_matkul": "Sistem Informasi", "sks": 2, "semester": 7},
        {"kode_matkul": "IF3018", "nama_matkul": "Manajemen Basis Data", "sks": 3, "semester": 7},
        {"kode_matkul": "IF3034", "nama_matkul": "Interaksi Manusia dan Komputer", "sks": 2, "semester": 7}
    ]

    for course_data in courses:
        matakuliah = models.MataKuliah(**course_data)
        dbsession.add(matakuliah)


def parse_args(argv):
    """
    Parse command line arguments.
    """
    parser = argparse.ArgumentParser(
        description="Initialize the database with sample data."
    )
    parser.add_argument(
        'config_uri',
        help="The configuration file to use.",
    )
    return parser.parse_args(argv[1:])


def main(argv=sys.argv):
    args = parse_args(argv)
    setup_logging(args.config_uri)
    env = bootstrap(args.config_uri)

    try:
        settings = env['registry'].settings
        engine = engine_from_config(settings, prefix='sqlalchemy.')
        Base.metadata.create_all(engine)
        
        # Create a session factory
        session_factory = sessionmaker(bind=engine)
        
        with transaction.manager:
            dbsession = get_tm_session(session_factory, transaction.manager)
            setup_models(dbsession)
            
    except OperationalError:
        print("Database is not initialized. Please run the database migration first.")
        sys.exit(1)
    finally:
        env['closer']()


if __name__ == '__main__':
    main()